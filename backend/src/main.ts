import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9093'], // Adresse du broker Kafka
      },
      consumer: {
        groupId: 'nestjs-consumer-client', // Groupe Kafka
      },
    },
  });

  // Utiliser Socket.IO comme adapter WebSocket
  app.useWebSocketAdapter(new IoAdapter(app));


  await app.startAllMicroservices()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
