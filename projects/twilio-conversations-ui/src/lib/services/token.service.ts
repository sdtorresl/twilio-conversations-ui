import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private httpClient: HttpClient) {}

  getToken(tokenUrl: string): Observable<{ token: string }> {
    return this.httpClient.get<{ token: string }>(tokenUrl);
  }
}
