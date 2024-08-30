import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation } from '@twilio/conversations';
import { ConversationUi } from '../../models/conversation-ui.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { ConversationCreateComponent } from "../conversation-create/conversation-create.component";

@Component({
  selector: 'lib-conversations-list',
  standalone: true,
  imports: [NgFor, DateFormatPipe, ConversationCreateComponent],
  templateUrl: './conversations-list.component.html',
  styleUrl: './conversations-list.component.scss',
})
export class ConversationsListComponent implements OnInit {
  conversations: ConversationUi[] = [];
  filteredConversations: ConversationUi[] = [];

  constructor(private twilioConversationsService: TwilioConversationsService) { }

  ngOnInit(): void {
    this.twilioConversationsService.getSubscribedConversations().subscribe({
      next: (paginator) => {
        if (paginator) {
          var conversations: Conversation[] = paginator.items;

          for (var conversation of conversations) {
            var conversationUi = new ConversationUi(conversation);

            this.conversations.push(conversationUi);
            this.filteredConversations.push(conversationUi);
          }
        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });
  }

  selectConversation(conversation: Conversation): void {
    console.log('Selected conversation:', conversation.sid);
    this.twilioConversationsService.setActiveConversation(conversation);
  }

  searchConversations(searchString: string): void {
    const lowerCaseSearchString = searchString.toLowerCase();
    this.filteredConversations = this.conversations.filter((conversationUi) =>
      conversationUi.displayName.toLowerCase().includes(lowerCaseSearchString)
    );
  }
}
