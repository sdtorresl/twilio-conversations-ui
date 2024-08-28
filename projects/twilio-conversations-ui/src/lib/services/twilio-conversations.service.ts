import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Client as ConversationsClient,
  Conversation,
  Paginator,
  Participant,
} from '@twilio/conversations';

@Injectable({
  providedIn: 'root',
})
export class TwilioConversationsService {
  private conversationsClient?: ConversationsClient;
  private conversationsReady: BehaviorSubject<Paginator<Conversation> | null> =
    new BehaviorSubject<Paginator<Conversation> | null>(null);

  constructor(private tokenService: TokenService) { }

  async initializeClient(tokenUrl: string): Promise<void> {
    this.tokenService.getToken(tokenUrl).subscribe({
      next: (response) => {
        this.conversationsClient = new ConversationsClient(response.token);
        this.conversationsClient.on(
          'conversationAdded',
          async (conversation) => {
            const paginator =
              await this.conversationsClient!.getSubscribedConversations();
            this.conversationsReady.next(paginator);
          }
        );
      },
      error: (error) => {
        console.error(error);
      },
    });

  }

  getSubscribedConversations(): Observable<Paginator<Conversation> | null> {
    return this.conversationsReady.asObservable();
  }

  getConversationName(conversation: Conversation): string {
    if (conversation.friendlyName != null) {
      return conversation.friendlyName;
    }

    const participants: Map<string, Participant> = conversation._participants;

    let identitiesString = '';

    participants.forEach((participant: Participant) => {
      if (participant.identity) {
        identitiesString += `${participant.identity}, `;
      } else {
        identitiesString += `${participant.bindings}, `;
      }
    });

    if (identitiesString.length > 0) {
      identitiesString = identitiesString.slice(0, -2);
    }

    return identitiesString;
  }
}
