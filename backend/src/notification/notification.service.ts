import { Injectable } from '@nestjs/common';
import { MessagePattern, KafkaContext } from '@nestjs/microservices';

@Injectable()
export class NotificationService {

  // Consommer les messages du topic 'ad-notifications'
  @MessagePattern('ad-notifications') // Sujet du topic Kafka que l'on écoute
  handleAdNotification(message: any, context: KafkaContext) {
    // Récupérer les données envoyées dans le message
    const receivedMessage = context.getMessage().value.toString(); // Convert the Buffer to a string
    console.log('Notification reçue:', JSON.parse(receivedMessage)); // Affiche la notification

    // Logique pour traiter la notification (par exemple, envoyer un email ou une notification push)
  }
}
