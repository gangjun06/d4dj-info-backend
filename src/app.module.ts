import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi';
import { RoleGuard } from './auth/role.guard';
import { ResourceModule } from './resource/resource.module';
import { PrismaService } from './prisma.service';
import { MusicModule } from './music/music.module';
import { CharacterModule } from './character/character.module';
import { AppController } from './app.controller';
import { EventModule } from './event/event.module';
import { ItemsModule } from './items/items.module';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        JWT_SECRET: Joi.string().required(),
        BASE_FILE_URL: Joi.string().uri(),
        PORT: Joi.number(),
        GOOGLE_CIENT_ID: Joi.string(),
        GOOGLE_CIENT_SECRET: Joi.string(),
        GOOGLE_CALLBACK_URL: Joi.string(),
      }),
      load: [configuration],
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      autoSchemaFile: true,
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
      path: '/graphql',
    }),
    AuthModule,
    ResourceModule,
    MusicModule,
    CharacterModule,
    EventModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
