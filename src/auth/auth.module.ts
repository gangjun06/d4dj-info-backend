import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma.service';
import { UserController } from './auth.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1y' },
    }),
  ],

  providers: [
    PrismaService,
    AuthResolver,
    AuthService,
    JwtStrategy,
    GoogleStrategy,
  ],

  controllers: [UserController],
})
export class AuthModule {}
