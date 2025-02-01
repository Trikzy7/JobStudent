import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AdsModule } from './ads/ads.module';
// import { ApplicationsModule } from './applications/applications.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafka-consumer/kafka-consumer.service';
import { NotificationService } from './notification/notification.service';
import { NotificationsGateway } from './notification/notification.gateway';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://mongodb:27017/job-student-sandbox'), // Remplace avec ton URI
    MongooseModule.forRoot('mongodb://localhost:27017/job-student-sandbox'), // Remplace avec ton URI
    UserModule, AdsModule, AuthModule, 
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9093'],  // Assurez-vous que l'adresse est correcte
          },
          consumer: {
            groupId: 'nestjs-consumer-client', // Un groupe unique
          },
        },
      },
    ]),
  ],
  providers: [KafkaConsumerService, NotificationService, NotificationsGateway],
})
export class AppModule {}
