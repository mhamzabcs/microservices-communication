import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: process.env.RMQ_URL,
      queue: process.env.RQ_ORDER_QUEUENAME,
      queueOptions: {
        durable: false,
      },
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();