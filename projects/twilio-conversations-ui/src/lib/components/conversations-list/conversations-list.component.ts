import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation } from '@twilio/conversations';

@Component({
  selector: 'lib-conversations-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.scss'
})
export class ConversationsListComponent implements OnInit {
  conversationsString: string[] = [];

  constructor(private twilioConversationsService: TwilioConversationsService) { }

  ngOnInit(): void {
    this.twilioConversationsService.getSubscribedConversations().subscribe({
      next: (paginator) => {
        if (paginator) {
          var conversations: Conversation[] = paginator.items;

          for (var conversation of conversations) {

            this.conversationsString.push(this.twilioConversationsService.getConversationName(conversation));
          }

        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });


  }


}
