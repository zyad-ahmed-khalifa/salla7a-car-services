import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { SessionService } from '../../../service/session.service';
import { AvatarComponent, LogoComponent } from './ui.components';

@Component({
  selector: 'app-customer-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LogoComponent, AvatarComponent],
  templateUrl: './customer-layout.component.html',
})
export class CustomerLayoutComponent {
  readonly session = inject(SessionService);
  readonly cart = inject(CartService);
  private readonly router = inject(Router);
  readonly mobileOpen = signal(false);

  readonly navItems = [
    { label: 'Spare Parts', path: '/customer/products' },
    { label: 'Emergency', path: '/customer/emergencies/request' },
    { label: 'My Emergencies', path: '/customer/emergencies' },
    { label: 'Orders', path: '/customer/orders' },
    { label: 'Vehicles', path: '/customer/vehicles' },
  ];

  firstName(): string {
    return this.session.user()?.name.split(' ')[0] ?? 'User';
  }

  goHome(): void {
    void this.router.navigateByUrl('/customer/products');
  }
}
