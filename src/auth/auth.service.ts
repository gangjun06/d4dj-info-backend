import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as randomString from 'randomstring';
import * as bcrypt from 'bcrypt';
import { prisma, User } from '@prisma/client';
import { UserWithToken } from './user';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

export enum Provider {
  GOOGLE = 'google',
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(PrismaService) private prismaService: PrismaService,
  ) {}

  async validateOAuthLogin(
    thirdPartyId: string,
    provider: Provider,
  ): Promise<string> {
    try {
      //; TODO:

      const payload = {
        thirdPartyId,
        provider,
      };

      const jwt: string = sign(payload, this.configService.get('jwtSecret'), {
        expiresIn: 3600,
      });
      return jwt;
    } catch (err) {
      throw new InternalServerErrorException('validateOAuthLogin', err.message);
    }
  }
}
