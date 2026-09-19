import { Component, inject, signal } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { AlertComponent, AvatarComponent, ButtonComponent, InputComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-profile',
  imports: [AlertComponent, AvatarComponent, ButtonComponent, InputComponent],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly session = inject(SessionService);
  readonly editing = signal(false);
  readonly saved = signal(false);
  name = this.session.user()?.name ?? 'Ahmed Al-Rashidi';
  email = this.session.user()?.email ?? 'ahmed@example.com';
  phone = this.session.user()?.phone ?? '+966 50 123 4567';
  address = this.session.user()?.address ?? 'Riyadh, Al-Olaya District';

  save(): void {
    this.saved.set(true);
    this.editing.set(false);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
