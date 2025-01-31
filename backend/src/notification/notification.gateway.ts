import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(8080, { namespace: '/ws/notifications' })
  export class NotificationsGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    private server: Server;
  
    handleConnection(client: Socket) {
      console.log('Client connecté:', client.id);
    }
  
    handleDisconnect(client: Socket) {
      console.log('Client déconnecté:', client.id);
    }
  
    // Envoie une notification aux clients connectés
    @SubscribeMessage('sendNotification')
    handleNotification(@MessageBody() data: string): void {
      console.log('Notification envoyée:', data);
      this.server.emit('ads', data);  // Envoie un message à tous les clients
    }
  }
  