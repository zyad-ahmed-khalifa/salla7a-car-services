import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { SessionService } from '../../service/session.service';
import { OrderService } from '../../service/order.service';
import { ButtonComponent, InputComponent, SelectComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-checkout', imports: [ButtonComponent, InputComponent, SelectComponent], templateUrl: './checkout.component.html' })
export class CheckoutComponent {
  readonly cart = inject(CartService);
  private readonly session = inject(SessionService);
  private readonly orders = inject(OrderService);
  private readonly router = inject(Router);
  readonly step = signal<'info' | 'address' | 'review' | 'done'>('info');
  readonly placing = signal(false);
  readonly error = signal('');
  readonly orderNumber = signal('');
  name = this.session.user()?.name ?? '';
  email = this.session.user()?.email ?? '';
  phone = this.session.user()?.phone ?? '';
  address = this.session.user()?.address ?? '';
  city = 'Cairo'; area = ''; buildingNumber = ''; floor = ''; apartmentNumber = ''; notes = '';
  readonly steps = [{ key: 'info' as const, label: 'Contact' }, { key: 'address' as const, label: 'Shipping' }, { key: 'review' as const, label: 'Review' }];
  readonly cities = ['Cairo', 'Giza', 'Alexandria', 'Qalyubia', 'Dakahlia', 'Sharqia'].map(v => ({ value: v, label: v }));
  stepIndex(): number { return this.steps.findIndex(s => s.key === this.step()); }

  place(): void {
    this.error.set('');
    if (!this.phone.trim() || !this.city || !this.area.trim() || !this.buildingNumber || !this.floor || !this.apartmentNumber) { this.error.set('Please complete your phone and shipping address.'); return; }
    if (this.cart.items().length === 0) { this.error.set('Your cart is empty.'); return; }
    this.placing.set(true);
    const shipping = this.cart.shipping();
    const payload = {
      items: this.cart.items().map(i => ({ partId: i.product.id, quantity: i.quantity })),
      phoneNumber: this.phone.trim(),
      address: { city: this.city, area: this.area.trim(), buildingNumber: Number(this.buildingNumber), floor: Number(this.floor), apartmentNumber: Number(this.apartmentNumber), additionalDetails: this.notes.trim() },
      paymentMethod: 'Cash on Delivery',
      shippingCost: shipping,
    };
    this.orders.createOrder(payload).subscribe({
      next: res => { this.cart.clear(); this.orderNumber.set(String(res?.data?._id ?? 'Created')); this.step.set('done'); this.placing.set(false); },
      error: err => { this.error.set(typeof err.error === 'string' ? err.error : 'Could not place the order.'); this.placing.set(false); },
    });
  }
  go(path: string): void { void this.router.navigateByUrl(path); }
}
