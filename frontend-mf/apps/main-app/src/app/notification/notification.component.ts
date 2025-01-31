import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StompService } from '@stomp/ng2-stompjs';
import { WebSocketSubject } from 'rxjs/webSocket';



@Component({
  selector: 'ng-mf-notification',
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  private wsSubject!: WebSocketSubject<any>;

  constructor() {}

  ngOnInit() {
    // Créer une connexion WebSocket vers le serveur
    this.wsSubject = new WebSocketSubject('ws://localhost:8080/ws/notifications');  // Assure-toi que l'URL soit correcte

    // Souscrire aux messages reçus via WebSocket
    this.wsSubject.subscribe(
      (message) => {
        console.log('Message reçu : ', message);
        alert('Nouvelle annonce ajoutée: ' + message);
      },
      (err) => console.error('Erreur WebSocket', err),
      () => console.log('WebSocket fermé')
    );
  }

  // Envoi d'un message via WebSocket (optionnel)
  sendMessage(message: string) {
    this.wsSubject.next({ content: message });
  }
}
