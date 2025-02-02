import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ClientKafka, MessagePattern, KafkaContext } from '@nestjs/microservices';
import { Kafka } from 'kafkajs';
import { NotificationsGateway } from 'src/notification/notification.gateway';

@Injectable()
export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
  private client: ClientKafka;

  // constructor() {
  //   // Initialisation du client Kafka (non nécessaire si tu utilises déjà un microservice)
  //   this.client = new ClientKafka({
  //     client: {
  //       brokers: ['localhost:9093'], // Remplace par ton broker Kafka
  //     },
  //   });
  // }

  private kafka = new Kafka({
    clientId: 'ad-consumer',
    // brokers: ['localhost:9093'],
    brokers: ['kafka:9093'],
  });

  private consumer = this.kafka.consumer({ groupId: 'ad-consumer-group' });

  constructor(private notificationsGateway: NotificationsGateway) {}
  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }


  // Cette méthode s'exécute lors de l'initialisation du module
  // onModuleInit() {
  //   this.client.connect();
  //   this.client.subscribeToResponseOf('ad-notifications'); // S'abonner au topic 'my-topic'
  // }

  // // Consommer les messages du topic 'ad-notifications'
  // @MessagePattern('ad-notifications') // Topic Kafka que tu veux consommer
  // consumeMessage(message: any, context: KafkaContext) {
  //   // Obtenir le message Kafka via le contexte
  //   const kafkaMessage = context.getMessage();
  //   console.log('Message reçu:', kafkaMessage.value); // Afficher le contenu du message
  //   // Traitement du message ici (par exemple, mise à jour de la base de données, etc.)
  // }

  // // Cette méthode s'exécute lors de la destruction du module
  // onModuleDestroy() {
  //   this.client.close();
  // }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'ad-notifications', fromBeginning: false });
    this.consumeMessages();
  }

  private async consumeMessages() {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const notification = JSON.parse(message.value.toString());
        console.log('Message Kafka reçu:', notification);
        this.notificationsGateway.sendNotification(notification);
      },
    });
  }
}
