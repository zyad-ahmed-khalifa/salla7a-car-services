import { Component, inject, OnInit, signal } from '@angular/core';
import type { Product } from '../../model/spare-part.model';
import { SparePartService } from '../../service/spare-part.service';
import { ButtonComponent, ConfirmComponent, InputComponent, ModalComponent, SearchBarComponent, SelectComponent, TextareaComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-products-management', imports: [ButtonComponent, ConfirmComponent, InputComponent, ModalComponent, SearchBarComponent, SelectComponent, TextareaComponent], templateUrl: './products-management.component.html' })
export class ProductsManagementComponent implements OnInit {
  private readonly service = inject(SparePartService);
  readonly productList = signal<Product[]>([]);
  readonly search = signal('');
  readonly categoryFilter = signal('All');
  readonly showModal = signal(false);
  readonly editing = signal<Product | null>(null);
  readonly confirmDelete = signal<string | null>(null);
  readonly saving = signal(false);
  name = ''; brand = 'Bosch'; category = 'Engine'; type: Product['type'] = 'Original'; price = ''; stock = ''; description = ''; compatibleCars = '';
  readonly brands = ['Bosch', 'Denso', 'Monroe', 'AC Delco', 'K&N', 'NGK', 'Moog', 'Mobil 1', 'Other'].map((b) => ({ value: b, label: b }));
  readonly categories = ['Engine', 'Brakes', 'Suspension', 'Electrical', 'Filters', 'Fluids', 'Body'].map((c) => ({ value: c, label: c }));
  readonly types = ['Original', 'OEM', 'Aftermarket'].map((t) => ({ value: t, label: t }));

  ngOnInit(): void { this.load(); }
  load(): void { this.service.getSpareParts().subscribe({ next: (res) => this.productList.set((Array.isArray(res) ? res : res?.data ?? []).map((x: any) => this.service.toProduct(x))) }); }

  filtered(): Product[] {
    const q = this.search().toLowerCase().trim();
    return this.productList().filter((p) => (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) && (this.categoryFilter() === 'All' || p.category === this.categoryFilter()));
  }

  openAdd(): void { this.editing.set(null); this.name=''; this.brand='Bosch'; this.category='Engine'; this.type='Original'; this.price=''; this.stock=''; this.description=''; this.compatibleCars=''; this.showModal.set(true); }
  openEdit(p: Product): void { this.editing.set(p); this.name=p.name; this.brand=p.brand; this.category=p.category; this.type=p.type; this.price=String(p.price); this.stock=String(p.stock); this.description=p.description; this.compatibleCars=p.compatibleCars.join('\n'); this.showModal.set(true); }

  private imageFor(): string {
    const key = `${this.category} ${this.name}`.toLowerCase();
    if (key.includes('brake')) return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop&auto=format';
    if (key.includes('filter')) return 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop&auto=format';
    if (key.includes('spark') || key.includes('plug')) return 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format';
    if (key.includes('oil')) return 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop&auto=format';
    return 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop&auto=format';
  }

  save(): void {
    if (!this.name.trim() || !this.description.trim() || Number(this.price) < 0 || Number(this.stock) < 0) return;
    this.saving.set(true);
    const payload = { name: this.name.trim(), brand: this.brand, category: this.category, type: this.type, price: Number(this.price), stock: Number(this.stock), description: this.description.trim(), img: this.imageFor(), compatibleCars: this.compatibleCars.split('\n').map(x => x.trim()).filter(Boolean).map(x => ({ make: x.split(' ')[0] || 'Universal', model: x.split(' ').slice(1).length ? [x.split(' ').slice(1).join(' ')] : ['Universal'] })) };
    const request = this.editing() ? this.service.updateSparePart(this.editing()!.id, payload) : this.service.addSparePart(payload);
    request.subscribe({ next: () => { this.showModal.set(false); this.saving.set(false); this.load(); }, error: () => this.saving.set(false) });
  }

  delete(id: string): void { this.service.deleteSparePart(id).subscribe({ next: () => { this.confirmDelete.set(null); this.load(); } }); }
}
