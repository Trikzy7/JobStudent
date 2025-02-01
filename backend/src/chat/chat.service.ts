import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class ChatService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: ['amqp://guest:guest@localhost:5672'],
                queue: 'chat_messages',
                queueOptions: { durable: false },
            },
        });
    }

    // Publier un message
    sendMessage(adId: string, userId: string, message: string) {
        console.log('BACKEND - Envoi du message:', { adId, userId, message });
        return this.client.emit('chat.newMessage', { adId, userId, message, timestamp: new Date() });
    }
}
