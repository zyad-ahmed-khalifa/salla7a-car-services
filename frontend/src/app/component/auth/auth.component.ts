import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../service/session.service';
import { ButtonComponent, InputComponent, LogoComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, ButtonComponent, InputComponent, LogoComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly session = inject(SessionService);
  readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly tab = signal<'login' | 'signup'>('login');
  readonly loading = signal(false);
  readonly error = signal('');
  name = '';
  email = '';
  phone = '';
  password = '';
  confirm = '';

  constructor() {
    const mode = this.route.snapshot.data['mode'] as 'login' | 'signup' | undefined;
    this.tab.set(mode === 'signup' ? 'signup' : 'login');
  }

  setTab(tab: 'login' | 'signup'): void {
    this.error.set('');
    this.tab.set(tab);
    void this.router.navigateByUrl(tab === 'login' ? '/login' : '/register');
  }

  private validEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  private validPassword(): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password);
  }

  submit(): void {
    this.error.set('');
    if (!this.validEmail()) {
      this.error.set('Please enter a valid email address, for example: name@example.com');
      return;
    }
    if (!this.validPassword()) {
      this.error.set('Password must be at least 8 characters and contain uppercase, lowercase, and a number.');
      return;
    }

    if (this.tab() === 'signup') {
      if (!this.name.trim()) { this.error.set('Full name is required.'); return; }
      if (this.password !== this.confirm) { this.error.set('Passwords do not match.'); return; }
    }

    this.loading.set(true);
    const done = (message?: string) => {
      this.loading.set(false);
      if (message) this.error.set(message);
    };

    if (this.tab() === 'signup') {
      this.session.register({ name: this.name.trim(), email: this.email.trim(), phone: this.phone.trim(), password: this.password }, done);
    } else {
      this.session.login(this.email.trim(), this.password, done);
    }
  }
}
