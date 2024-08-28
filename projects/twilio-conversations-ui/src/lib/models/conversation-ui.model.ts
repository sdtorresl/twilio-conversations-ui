import { Conversation, Participant } from '@twilio/conversations';

export class ConversationUi {

    conversation: Conversation;
    _displayName: string = '';

    constructor(conversation: Conversation) {
        this.conversation = conversation;
    }

    get displayName(): string {
        if (this.conversation.friendlyName != null) {
            return this.conversation.friendlyName;
        }

        const participants: Map<string, Participant> = this.conversation._participants;

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
