import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller('chat')
export class ChatController {
  private chatRooms = new Map<string, any[]>(); // Stocke les messages par annonce

  @EventPattern('chat.newMessage')
  handleNewMessage(data: { adId: string; userId: string; message: string; timestamp: Date }) {
    const { adId, userId, message, timestamp } = data;

    if (!this.chatRooms.has(adId)) {
      this.chatRooms.set(adId, []);
    }

    this.chatRooms.get(adId).push({ userId, message, timestamp });
    console.log(`📩 [Chat] Message reçu pour l'annonce ${adId}:`, message);
  }
}
