import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/exception-filters/globalException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalPipes(new ValidationPipe({ whitelist: true , transform: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
