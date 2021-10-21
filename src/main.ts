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
        brokers: ['pkc-4nym6.us-east-1.aws.confluent.cloud:9092'],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: 'GEJRSA2U5E434L5L',
          password:
            '/sWhrlLf0nJn7KjnXgAIGrnxG6GE8x19Fsj4sXCQysziwdStjO1+Dc9ch09AaFHa',
        },
      },
    },
  } as MicroserviceOptions);

  app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
