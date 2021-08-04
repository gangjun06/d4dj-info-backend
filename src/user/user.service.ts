import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as randomString from 'randomstring';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}

  private async passwordHash(plainPassword: string): Promise<string> {
    const hashed = await bcrypt.hash(plainPassword, 10);
    return hashed;
  }

  private async passwordCompare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }

  async getToken(id: number): Promise<string> {
    try {
      return await this.jwtService.signAsync({ id });
    } catch (err) {
      console.error(err);
    }
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('account is already exists');
    const hashedPassword = await this.passwordHash(password);
    return this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();
    const isMatch = await this.passwordCompare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();
    return this.getToken(user.id);
  }

  async sendVerifyMail(email: string): Promise<void> {
    const verifyEmail = await this.prismaService.verifyEmail.findUnique({
      where: { email },
    });
    const createAt = verifyEmail.createAt;
    createAt.setMinutes(createAt.getMinutes() + 1);
    if (verifyEmail && new Date() < createAt)
      throw new HttpException(
        'you can request verify email every 1 minutes',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    const random = randomString.generate(6);

    await this.prismaService.verifyEmail.upsert({
      where: { email },
      create: {
        email,
        code: random,
      },
      update: {
        email,
        code: random,
        createAt: new Date(),
      },
    });
    const [domain, apiKey] = [
      process.env.MAILGUN_DOMAIN,
      process.env.MAILGUN_APIKEY,
    ];
    const mg = mailgun({ domain, apiKey });
    const url = `https://d4dj.info/auth/verify?email=${encodeURIComponent(
      email,
    )}&code=${random}`;
    const data = {
      from: `D4DJ.Info Alert <no-reply@${domain}>`,
      to: email,
      subject: 'D4DJ Verify Email',
      template: 'withbtn',
      'v:text1': 'D4DJ.Info email verify',
      'v:text2': 'If the request is not you, please ignore it.',
      'v:link-href': `${url}`,
      'v:link-text': `Verify Email`,
      'v:text4': `Link not working? Enter [ ${random} ]`,
      'v:copyright': `© ${new Date().getFullYear()}. D4DJ.info`,
    };
    await mg.messages().send(data, (err, body) => {});
  }

  async emailVerify(email: string, code: string): Promise<String> {
    const verifyEmail = await this.prismaService.verifyEmail.findUnique({
      where: { email },
    });
    if (!verifyEmail || verifyEmail.code !== code)
      throw new UnauthorizedException('verify code or email is not correct');
    const user = await this.prismaService.user.update({
      where: { email },
      data: { emailVerified: true },
    });
    return this.getToken(user.id);
  }
}
