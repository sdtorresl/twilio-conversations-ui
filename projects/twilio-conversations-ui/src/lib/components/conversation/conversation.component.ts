import { Component, OnInit } from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation, Message } from '@twilio/conversations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'lib-conversation',
  standalone: true,
  imports: [NgFor, DateFormatPipe, NgIf, NgClass],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  conversation?: Conversation;
  messages: Message[] = [];

  constructor(private twilioConversationsService: TwilioConversationsService) { }

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

    this.twilioConversationsService.getActiveConversationMessages().subscribe({
      next: (messages) => {
        if (messages) {
          this.messages = messages;
        }
      },
      error: (error) => {
        console.error(error);
        // Handle the error, possibly by showing an error message in the UI
      },
    });
  }

  sendMessage(inputElement: HTMLInputElement): void {
    const message = inputElement.value.trim();
    if (message && this.conversation) {
      this.twilioConversationsService.sendMessage(message);
      inputElement.value = ''; // Clear the input text
    }
  }

  isAuthor(message: Message) {
    var user = this.twilioConversationsService.getUser();
    return user?.identity == message.author;
  }
}
