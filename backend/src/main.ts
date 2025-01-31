import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9093'],  // Liste des brokers
      },
      consumer: {
        groupId: 'notification-consumer', // Un groupe pour le consommateur Kafka
      },
    },
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
