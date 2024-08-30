import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantCreateComponent } from './participant-create.component';

describe('ParticipantCreateComponent', () => {
  let component: ParticipantCreateComponent;
  let fixture: ComponentFixture<ParticipantCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
