import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Client as ConversationsClient,
  Conversation,
  Paginator,
} from '@twilio/conversations';

@Injectable({
  providedIn: 'root',
})
export class TwilioConversationsService {
  private conversationsClient?: ConversationsClient;
  private conversationsReady: BehaviorSubject<Paginator<Conversation> | null> =
    new BehaviorSubject<Paginator<Conversation> | null>(null);

  constructor(private tokenService: TokenService) {}

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
}
