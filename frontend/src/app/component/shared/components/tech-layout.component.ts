import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '../../../service/session.service';
import { AvatarComponent, LogoComponent } from './ui.components';

@Component({
  selector: 'app-tech-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent, AvatarComponent],
  templateUrl: './tech-layout.component.html',
})
export class TechLayoutComponent {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);
  readonly mobileOpen = signal(false);

  readonly navItems = [
    { label: 'Dashboard', path: '/technician/dashboard' },
    { label: 'Available', path: '/technician/emergencies' },
    { label: 'Current Job', path: '/technician/current' },
    { label: 'History', path: '/technician/history' },
    { label: 'Profile', path: '/technician/profile' },
  ];

  firstName(): string {
    return this.session.user()?.name.split(' ')[0] ?? 'Tech';
  }

  goHome(): void {
    void this.router.navigateByUrl('/technician/dashboard');
  }
}
