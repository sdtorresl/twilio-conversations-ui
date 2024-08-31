import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { TwilioConversationsService } from '../../services/twilio-conversations.service';
import { identity } from 'rxjs';

@Component({
  selector: 'lib-participant-create',
  standalone: true,
  imports: [],
  templateUrl: './participant-create.component.html',
  styleUrl: './participant-create.component.scss',
})
export class ParticipantCreateComponent {
  @ViewChild('identity') identityInput!: ElementRef<HTMLInputElement>;

  constructor(
    private twilioConversationService: TwilioConversationsService,
    private modalService: ModalService
  ) {}

  closeModal() {
    this.modalService.close();
  }

  addParticipant() {
    const identity = this.identityInput.nativeElement.value;
    this.twilioConversationService.addParticipant(identity);
    this.identityInput.nativeElement.value = '';
    this.modalService.close();
  }
}
