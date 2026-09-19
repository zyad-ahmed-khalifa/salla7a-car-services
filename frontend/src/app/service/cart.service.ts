import { Injectable, computed, signal } from '@angular/core';
import type { CartItem } from '../model/cart.model';
import type { Product } from '../model/spare-part.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly count = computed(() => this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );
  readonly shipping = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    return sub > 100 ? 0 : 15;
  });
  readonly total = computed(() => this.subtotal() + this.shipping());

  add(product: Product, quantity = 1): void {
    this.itemsSignal.update((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      if (existing) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [...items, { product, quantity }];
    });
  }

  update(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
      return;
    }
    this.itemsSignal.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}
