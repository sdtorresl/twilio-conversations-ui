import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { Conversation, Message, Participant } from '@twilio/conversations';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { ConversationUi } from '../../models/conversation-ui.model';
import { ModalService } from '../../services/modal.service';
import { ConversationCreateComponent } from '../conversation-create/conversation-create.component';

@Component({
  selector: 'lib-conversation',
  standalone: true,
  imports: [NgFor, DateFormatPipe, NgIf, NgClass, PickerComponent],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  conversation?: Conversation;
  conversationUi?: ConversationUi;
  messages: Message[] = [];

  constructor(
    private twilioConversationsService: TwilioConversationsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.twilioConversationsService.getActiveConversation().subscribe({
      next: (conversation) => {
        if (conversation) {
          this.conversation = conversation;
          this.conversation.getMessages().then((paginator) => {
            this.messages = paginator.items;
          });
          this.conversationUi = new ConversationUi(this.conversation);
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

  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any, inputElement: HTMLInputElement) {
    const emoji = event.emoji.native;
    inputElement.value += emoji;
  }

  sendMessage(inputElement: HTMLInputElement): void {
    const message = inputElement.value.trim();
    if (message && this.conversation) {
      this.twilioConversationsService.sendMessage(message);
      inputElement.value = '';
      this.showEmojiPicker = false;
    }
  }

  isAuthor(message: Message) {
    var user = this.twilioConversationsService.getUser();
    return user?.identity == message.author;
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

  close() {
    this.modalService.close();
  }
}
