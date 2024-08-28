import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation, Message } from '@twilio/conversations';
import { NgFor } from '@angular/common';

@Component({
  selector: 'lib-conversation',
  standalone: true,
  imports: [NgFor],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent implements OnInit {
  conversation?: Conversation;
  messages: Message[] = [];

  constructor(private twilioConversationsService: TwilioConversationsService) {}

  ngOnInit(): void {
    this.twilioConversationsService.getActiveConversation().subscribe({
      next: (conversation) => {
        if (conversation) {
          this.conversation = conversation;
          this.conversation.getMessages().then((paginator) => {
            this.messages = paginator.items;
          });
        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });
  }
}
