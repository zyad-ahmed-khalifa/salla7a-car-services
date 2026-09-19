import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { SparePartService } from '../../service/spare-part.service';
import type { Product } from '../../model/spare-part.model';
import { ButtonComponent, StarsComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-product-detail', imports: [ButtonComponent, StarsComponent], templateUrl: './product-detail.component.html' })
export class ProductDetailComponent {
  readonly id = input.required<string>();
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);
  private readonly service = inject(SparePartService);
  readonly product = signal<Product | null>(null);
  readonly related = signal<Product[]>([]);
  readonly qty = signal(1);
  readonly added = signal(false);
  readonly loading = signal(true);
  readonly Math = Math;

  constructor() {
    effect(() => {
      const id = this.id();
      this.loading.set(true);
      this.service.getSparePartById(id).subscribe({
        next: (raw) => {
          const p = this.service.toProduct(raw?.data ?? raw);
          this.product.set(p);
          this.qty.set(1);
          this.loading.set(false);
          this.service.getSpareParts().subscribe({
            next: (res) => {
              const all = (Array.isArray(res) ? res : res?.data ?? []).map((x: any) => this.service.toProduct(x));
              this.related.set(all.filter((x: Product) => x.id !== p.id && (x.category === p.category || x.brand === p.brand)).slice(0, 4));
            },
          });
        },
        error: () => { this.product.set(null); this.loading.set(false); },
      });
    });
  }

  typeClass(): string {
    const type = this.product()?.type;
    if (type === 'Original') return 'bg-success/10 text-success border-success/20';
    if (type === 'OEM') return 'bg-info/10 text-info border-info/20';
    return 'bg-panel text-muted border-border';
  }

  add(): void {
    const p = this.product();
    if (!p || p.stock === 0) return;
    this.cart.add(p, this.qty());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }

  back(): void { void this.router.navigateByUrl('/customer/products'); }
  goCart(): void { void this.router.navigateByUrl('/customer/cart'); }
  open(id: string): void { void this.router.navigate(['/customer/products', id]); }
}
