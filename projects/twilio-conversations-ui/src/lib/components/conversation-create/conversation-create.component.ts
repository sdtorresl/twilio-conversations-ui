import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';

@Component({
  selector: 'lib-conversation-create',
  standalone: true,
  imports: [],
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.scss',
})
export class ConversationCreateComponent {
  @ViewChild('friendlyName') friendlyNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private twilioConversationsService: TwilioConversationsService,
    private modalService: ModalService
  ) {}

  createConversation() {
    const friendlyName = this.friendlyNameInput.nativeElement.value;
    console.log('Name: ' + friendlyName);
    this.twilioConversationsService.createConversastion(friendlyName);

    this.friendlyNameInput.nativeElement.value = '';
    this.modalService.close();
  }

  closeModal() {
    this.modalService.close();
  }
}
