import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const config = new DocumentBuilder()
  // .setTitle('Admin Dashboard')
  // .build();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(process.cwd(), 'public', 'images'), {
    prefix: '/images',
  });
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('admin', app, document);
  await app.listen(3000);
}
bootstrap();
