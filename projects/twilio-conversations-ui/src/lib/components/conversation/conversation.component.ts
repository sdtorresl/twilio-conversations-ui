import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation } from '@twilio/conversations';

@Component({
  selector: 'lib-conversation',
  standalone: true,
  imports: [],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.css',
})
export class ConversationComponent implements OnInit {
  conversation?: Conversation;

  constructor(private twilioConversationsService: TwilioConversationsService) {}

  ngOnInit(): void {
    this.twilioConversationsService.getActiveConversation().subscribe({
      next: (conversation) => {
        if (conversation) {
          this.conversation = conversation;
        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });
  }
}
