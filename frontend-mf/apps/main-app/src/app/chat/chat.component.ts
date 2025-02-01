import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, FormsModule],
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
    @Input() adId!: string;
    messages: any[] = [];
    newMessage = '';

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.joinChat(this.adId);
        this.chatService.getMessages().subscribe((message) => {
            this.messages.push(message);
        });
    }

    sendMessage() {
        this.chatService.sendMessage(this.adId, 'user123', this.newMessage);
        this.newMessage = '';
    }
}
