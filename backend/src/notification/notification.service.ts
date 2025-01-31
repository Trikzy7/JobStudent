import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class NotificationService {
  @MessagePattern('ad.added')
  handleAdAdded(message: any) {
    // Logique pour envoyer la notification aux utilisateurs
    console.log('Nouvelle annonce ajoutée:', message);
    // Implémentation de l'envoi de notification (par exemple WebSocket, push notifications, etc.)
  }
}
