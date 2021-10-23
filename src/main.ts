import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigType } from './configuration';
import { AuthGuard } from './user/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());
  const config = app.get(ConfigService);
  await app.listen(config.get<number>('PORT'));
}
bootstrap();
