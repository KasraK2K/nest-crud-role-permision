import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3500;
  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
