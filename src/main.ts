import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

const serverConfig = config.get('server');

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const port = process.env.PORT || serverConfig.port;
  const app = await NestFactory.create(AppModule, {
    logger: serverConfig.logger,
  });

  const config = new DocumentBuilder()
    .setTitle('Nest Tutorials')
    .setDescription('First try to learn Nest')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.setGlobalPrefix(serverConfig.prefix);

  await app.listen(port);
  logger.log(`Application is running on port ${port}`);
}
bootstrap();
