import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { ButtonComponent, EmptyStateComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-cart',
  imports: [ButtonComponent, EmptyStateComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  readonly cart = inject(CartService);
  private readonly router = inject(Router);

  go(path: string): void {
    void this.router.navigateByUrl(path);
  }

  openProduct(id: string): void {
    void this.router.navigate(['/customer/products', id]);
  }
}
