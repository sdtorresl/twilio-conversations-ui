import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwilioConversationsUiComponent } from './twilio-conversations-ui.component';

describe('TwilioConversationsUiComponent', () => {
  let component: TwilioConversationsUiComponent;
  let fixture: ComponentFixture<TwilioConversationsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwilioConversationsUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwilioConversationsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
