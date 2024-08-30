import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'lib-conversation-create',
  standalone: true,
  imports: [],
  templateUrl: './conversation-create.component.html',
  styleUrl: './conversation-create.component.scss',
})
export class ConversationCreateComponent {
  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.close();
  }
}
