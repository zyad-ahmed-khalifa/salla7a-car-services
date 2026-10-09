import { Injectable } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly session: SessionService) {}

  login(email: string, password: string): void {
    this.session.login(email, password);
  }

  logout(): void {
    this.session.logout();
  }
}
