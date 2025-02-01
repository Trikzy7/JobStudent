import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) { }

    // Envoyer un message via WebSocket
    @SubscribeMessage('sendMessage')
    handleMessage(@MessageBody() data: { adId: string; userId: string; message: string }) {
        console.log('Message reçu sur le serveur', data);  // Vérifie si l'événement est reçu
        this.chatService.sendMessage(data.adId, data.userId, data.message);
        this.server.to(data.adId).emit('newMessage', data);
    }

    // Joindre un salon de discussion (par annonce)
    @SubscribeMessage('joinChat')
    handleJoinChat(@MessageBody() adId: string) {
        console.log('Utilisateur rejoint le salon:', adId);  // Log pour vérifier que l'utilisateur rejoint le bon salon
        this.server.socketsJoin(adId);
    }
}
