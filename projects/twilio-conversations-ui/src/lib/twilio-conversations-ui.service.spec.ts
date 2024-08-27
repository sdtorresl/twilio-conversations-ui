import { TestBed } from '@angular/core/testing';

import { TwilioConversationsUiService } from './twilio-conversations-ui.service';

describe('TwilioConversationsUiService', () => {
  let service: TwilioConversationsUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwilioConversationsUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
