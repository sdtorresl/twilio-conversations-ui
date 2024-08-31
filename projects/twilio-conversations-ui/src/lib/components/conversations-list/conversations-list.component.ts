import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation } from '@twilio/conversations';
import { ConversationUi } from '../../models/conversation-ui.model';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { ConversationCreateComponent } from '../conversation-create/conversation-create.component';
import { ModalService } from '../../services/modal.service';

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
  selectedConversationSid: string | null = null;

  constructor(
    private twilioConversationsService: TwilioConversationsService,
    private modalService: ModalService
  ) { }

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
    this.selectedConversationSid = conversation.sid;
    this.twilioConversationsService.setActiveConversation(conversation);
  }

  searchConversations(searchString: string): void {
    const lowerCaseSearchString = searchString.toLowerCase();
    this.filteredConversations = this.conversations.filter((conversationUi) =>
      conversationUi.displayName.toLowerCase().includes(lowerCaseSearchString)
    );
  }

  openModalComponent() {
    this.modalService.open(ConversationCreateComponent, {
      animations: {
        modal: {
          enter: 'enter-scaling 0.3s ease-out',
          leave: 'fade-out 0.1s forwards',
        },
        overlay: {
          enter: 'fade-in 1s',
          leave: 'fade-out 0.3s forwards',
        },
      },
      size: {
        width: '40rem',
      },
    });
  }
}
