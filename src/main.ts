import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { SwaggerSetting } from './config/swagger';
import { GlobalVariable } from './config/global.variable';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  if (GlobalVariable.mode === 'development') SwaggerSetting(app);

  await app.listen(GlobalVariable.env.API_PORT);
}
bootstrap();
