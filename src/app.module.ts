import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { AuthGuard } from './user/auth.guard';
import { RoleGuard } from './user/role.guard';
import { ResourceModule } from './resource/resource.module';
import { PrismaService } from './prisma.service';
import { MusicModule } from './music/music.module';
import { CharacterModule } from './character/character.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        MAILGUN_APIKEY: Joi.string().required(),
        MAILGUN_DOMAIN: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        BASE_FILE_URL: Joi.string().uri().required(),
      }),
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    UserModule,
    ResourceModule,
    MusicModule,
    CharacterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
