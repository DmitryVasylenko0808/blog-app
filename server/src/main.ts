import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();
  app.setGlobalPrefix('api');
  console.log(join(__dirname, '..', '..', 'uploads/images'));
  app.useStaticAssets(join(__dirname, '..', '..', 'uploads/images'), {
    prefix: '/images',
  });

  await app.listen(configService.get<number>('PORT') || 4444);
}
bootstrap();
