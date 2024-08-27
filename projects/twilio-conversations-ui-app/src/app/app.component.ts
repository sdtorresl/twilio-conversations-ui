import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ConversationsListComponent,
  TokenService,
} from '../../../twilio-conversations-ui/src/public-api';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ConversationsListComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'twilio-conversations-ui-app';

  constructor() {}

  /*   constructor(private tokenService: TokenService) {}
  ngOnInit(): void {
    this.tokenService
      .getToken(
        'https://twilio-conversations-ui-7846.twil.io/token?identity=Sergio'
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.error(error);
        },
      });
  } */
}
