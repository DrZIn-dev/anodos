import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port: number = +configService.get('PORT');
  await app.listen(port, () => {
    logger.log(`Listen on : ${port}`);
  });
}
bootstrap();
