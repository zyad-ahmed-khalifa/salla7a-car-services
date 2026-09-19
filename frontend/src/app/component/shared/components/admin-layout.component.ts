import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SessionService } from '../../../service/session.service';
import { AvatarComponent, LogoComponent } from './ui.components';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent, AvatarComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  readonly session = inject(SessionService);
  private readonly router = inject(Router);
  readonly sidebarOpen = signal(false);

  readonly navItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Technicians', path: '/admin/technicians' },
    { label: 'Emergencies', path: '/admin/emergencies' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders' },
  ];

  goHome(): void {
    void this.router.navigateByUrl('/admin/dashboard');
  }
}
