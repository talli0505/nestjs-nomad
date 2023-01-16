import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist : 이걸 선언하면 성언된 변수들만 처리 그 이외 변수는 버림
      whitelist: true,
      // forbidNonWhitelisted : 이상한걸 보내면 리퀘스트 자체를 막아버림
      forbidNonWhitelisted: true,
      // transform : 유저에서 보내는 값(body)를 원하는 타입으로 자동 변환 시켜줌
      transform : true,
    }
  ))
  await app.listen(3000);
}
bootstrap();
