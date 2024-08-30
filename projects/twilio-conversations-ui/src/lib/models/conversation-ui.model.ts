import { Conversation, Message, Participant } from '@twilio/conversations';

export class ConversationUi {
  conversation: Conversation;
  _unreadMessages: number | undefined | null = 0;
  _displayName: string = '';

  constructor(conversation: Conversation) {
    this.conversation = conversation;
    conversation.getUnreadMessagesCount().then((count) => {
      this._unreadMessages = count;
    });
  }

  get unreadMessages(): number {
    return this._unreadMessages ?? 0;
  }

  get displayName(): string {
    if (this.conversation.friendlyName != null) {
      return this.conversation.friendlyName;
    }

    return this.displayParticipants;
  }

  get displayParticipants(): string {
    const participants: Map<string, Participant> =
      this.conversation._participants;

    let participantsString = '';

    participants.forEach((participant: Participant) => {
      if (participant.identity) {
        participantsString += `${participant.identity}, `;
      } else {
        participantsString += `${participant.bindings}, `;
      }
    });

    if (participantsString.length > 0) {
      participantsString = participantsString.slice(0, -2);
    }

    return participantsString;
  }

  async displayLastMessage(): Promise<string | null | undefined> {
    return this.conversation.getMessages().then((paginator) => {
      const messages: Message[] = paginator.items;
      if (messages.length > 0) {
        return messages[messages.length - 1]?.body;
      }

      return undefined;
    });
  }
}
