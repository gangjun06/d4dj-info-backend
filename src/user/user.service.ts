import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import mailgun from 'mailgun-js';
import { PrismaService } from 'src/prisma.service';
import cryptoRandomString from 'crypto-random-string';
import config from '../../config.json';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async createUser(email: string, name: string) {
    const user = this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('account is already exists');
    return this.prismaService.user.create({
      data: {
        email,
        name,
      },
    });
  }

  async sendVerifyMail(email: string, type: 'signin') {
    const random = cryptoRandomString({ length: 6 });
    const mg = mailgun({ apiKey: config.mailgun.api });
    const url = `https://d4dj.info/auth/verify?id=${random}`;
    const data = {
      from: `D4DJ.Info Alert <no-reply@${config.mailgun.domain}>`,
      to: email,
      subject: 'D4DJ Verify Email',
      template: 'withbtn',
      'h:X-Mailgun-Variables': {
        test: {
          text1: 'D4DJ.Info email verify',
          text2: 'If the request is not you, please ignore it.',
          'link-href': `${url}`,
          'link-text': `Verify Email`,
          text4: `Link not working? Enter [ ${random} ]`,
          copyright: `© ${new Date().getFullYear()}`,
        },
      },
    };
    mg.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
}
