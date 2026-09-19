import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { SparePartService } from '../../service/spare-part.service';
import type { Product } from '../../model/spare-part.model';
import { EmptyStateComponent, SearchBarComponent, StarsComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-products',
  imports: [EmptyStateComponent, SearchBarComponent, StarsComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);
  private readonly service = inject(SparePartService);

  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly categories = ['All', 'Engine', 'Brakes', 'Suspension', 'Electrical', 'Filters', 'Fluids', 'Body'];
  readonly brands = ['All Brands', 'Bosch', 'Denso', 'Monroe', 'AC Delco', 'K&N', 'NGK', 'Moog', 'Mobil 1'];
  readonly types = ['All Types', 'Original', 'OEM', 'Aftermarket'];
  readonly sortOptions = [
    { value: 'default', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'name', label: 'Name A-Z' },
  ];
  readonly search = signal('');
  readonly category = signal('All');
  readonly brand = signal('All Brands');
  readonly type = signal('All Types');
  readonly sort = signal('default');
  readonly maxPrice = signal(10000);
  readonly inStockOnly = signal(false);
  readonly addedId = signal<string | null>(null);

  readonly filtered = computed(() => {
    let list = [...this.products()];
    const q = this.search().toLowerCase().trim();
    if (q) list = list.filter((p) => `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q));
    if (this.category() !== 'All') list = list.filter((p) => p.category === this.category());
    if (this.brand() !== 'All Brands') list = list.filter((p) => p.brand === this.brand());
    if (this.type() !== 'All Types') list = list.filter((p) => p.type === this.type());
    list = list.filter((p) => p.price <= this.maxPrice());
    if (this.inStockOnly()) list = list.filter((p) => p.stock > 0);
    const sort = this.sort();
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  });

  ngOnInit(): void {
    this.service.getSpareParts().subscribe({
      next: (res) => {
        const raw = Array.isArray(res) ? res : res?.data ?? [];
        this.products.set(raw.map((p: any) => this.service.toProduct(p)));
        const max = this.products().reduce((m, p) => Math.max(m, p.price), 0);
        this.maxPrice.set(Math.max(100, Math.ceil(max)));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  reset(): void {
    this.category.set('All'); this.brand.set('All Brands'); this.type.set('All Types');
    this.maxPrice.set(Math.max(100, Math.ceil(this.products().reduce((m, p) => Math.max(m, p.price), 0))));
    this.inStockOnly.set(false);
  }

  open(p: Product): void { void this.router.navigate(['/customer/products', p.id]); }

  add(event: Event, p: Product): void {
    event.stopPropagation();
    if (p.stock === 0) return;
    this.cart.add(p);
    this.addedId.set(p.id);
    setTimeout(() => this.addedId.set(null), 1500);
  }

  typeClass(type: string): string {
    if (type === 'Original') return 'bg-success/20 text-success';
    if (type === 'OEM') return 'bg-info/20 text-info';
    return 'bg-panel text-muted';
  }
}
