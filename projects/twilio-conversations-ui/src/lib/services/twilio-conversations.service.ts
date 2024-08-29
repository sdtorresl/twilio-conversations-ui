import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Client as ConversationsClient,
  Conversation,
  Paginator,
  Message,
  Participant,
  User,
} from '@twilio/conversations';

@Injectable({
  providedIn: 'root',
})
export class TwilioConversationsService {
  private conversationsClient?: ConversationsClient;
  private conversationsReady: BehaviorSubject<Paginator<Conversation> | null> =
    new BehaviorSubject<Paginator<Conversation> | null>(null);
  private activeConversation: BehaviorSubject<Conversation | null> =
    new BehaviorSubject<Conversation | null>(null);
  private activeConversationMessages: BehaviorSubject<Message[] | null> =
    new BehaviorSubject<Message[] | null>(null);

  constructor(private tokenService: TokenService) {}

  async initializeClient(tokenUrl: string): Promise<void> {
    this.tokenService.getToken(tokenUrl).subscribe({
      next: async (response) => {
        this.conversationsClient = new ConversationsClient(response.token);
        this.updateConversations();

        this.conversationsClient.on('conversationAdded', (conversation) => {
          this.updateConversations();
        });

        this.conversationsClient.on('conversationRemoved', (conversation) => {
          this.updateConversations();
        });

        this.conversationsClient.on('conversationUpdated', (conversation) => {
          this.updateConversations();
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private async updateConversations() {
    const paginator =
      await this.conversationsClient!.getSubscribedConversations();
    this.conversationsReady.next(paginator);
  }

  getSubscribedConversations(): Observable<Paginator<Conversation> | null> {
    return this.conversationsReady.asObservable();
  }

  getActiveConversation(): Observable<Conversation | null> {
    return this.activeConversation.asObservable();
  }

  async setActiveConversation(conversation: Conversation): Promise<void> {
    if (this.activeConversation.value) {
      this.activeConversation.value.removeAllListeners();
    }

    this.activeConversation.next(conversation);
    var messages = await this.activeConversation.value?.getMessages();
    this.activeConversationMessages.next(messages?.items ?? []);

    conversation.on('messageAdded', (message) => {
      this.onMessageAdded(message);
    });

    conversation.on('messageRemoved', (message) => {
      var currentMessages = this.activeConversationMessages.value ?? [];
      var index = currentMessages.findIndex((m) => m.sid === message.sid);
      currentMessages.splice(index, 1);
      this.activeConversationMessages.next(currentMessages);
    });
  }

  private onMessageAdded(message: Message) {
    var currentMessages = this.activeConversationMessages.value ?? [];
    currentMessages.push(message);
    this.activeConversationMessages.next(currentMessages);
  }

  getActiveConversationMessages(): Observable<Message[] | null> {
    return this.activeConversationMessages.asObservable();
  }

  sendMessage(messageBody: string): void {
    this.activeConversation.value?.sendMessage(messageBody);
  }

  getUser(): User | undefined {
    return this.conversationsClient?.user;
  }

  createConversastion(friendlyName: string): void {
    this.conversationsClient
      ?.createConversation({ friendlyName })
      .then((conversation) => {
        conversation.join();
        this.updateConversations();
        this.setActiveConversation(conversation);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
