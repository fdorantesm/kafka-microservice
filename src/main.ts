import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      subscribe: {
        fromBeginning: true,
      },
      consumer: {
        groupId: 'kafka-consumer',
      },
      client: {
        brokers: ['localhost:29092'],
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
