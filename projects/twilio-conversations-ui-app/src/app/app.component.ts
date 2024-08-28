import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ConversationsListComponent,
  ConversationComponent,
} from '../../../twilio-conversations-ui/src/public-api';
import { TwilioConversationsService } from '../../../twilio-conversations-ui/src/lib/services/twilio-conversations.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConversationsListComponent, ConversationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'twilio-conversations-ui-app';

  constructor(private twilioConversationsService: TwilioConversationsService) {}

  ngOnInit(): void {
    this.twilioConversationsService.initializeClient(
      'https://twilio-conversations-ui-7846.twil.io/token?identity=Sergio'
    );
  }
}
