import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation } from '@twilio/conversations';

@Component({
  selector: 'lib-conversations-list',
  standalone: true,
  imports: [],
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.css',
})
export class ConversationsListComponent implements OnInit {
  conversations: Conversation[] = [];

  constructor(private twilioConversationsService: TwilioConversationsService) {}

  ngOnInit(): void {
    this.twilioConversationsService.getSubscribedConversations().subscribe({
      next: (paginator) => {
        if (paginator) {
          this.conversations = paginator.items;
          // Update the UI with the fetched conversations
          console.log(this.conversations);
        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });
  }
}
