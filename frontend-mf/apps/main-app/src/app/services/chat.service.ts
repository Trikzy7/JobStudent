import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket = io('http://localhost:3000');

  joinChat(adId: string) {
    this.socket.emit('joinChat', adId);
  }

  sendMessage(adId: string, userId: string, message: string) {
    console.log('Emitting message:', { adId, userId, message }); // Ajoute ce log
    this.socket.emit('sendMessage', { adId, userId, message });
    console.log('FRONTEND - Message envoyé');
  }


  getMessages(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newMessage', (data) => {
        observer.next(data);
      });
    });
  }
}
