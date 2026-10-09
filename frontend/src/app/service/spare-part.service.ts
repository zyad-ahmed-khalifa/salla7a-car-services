import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import type { Product } from '../model/spare-part.model';

@Injectable({ providedIn: 'root' })
export class SparePartService {
  private readonly api = inject(HttpService);

  private imageFor(category: string, name: string): string {
    const key = `${category} ${name}`.toLowerCase();
    if (key.includes('brake')) return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop&auto=format';
    if (key.includes('filter')) return 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&h=600&fit=crop&auto=format';
    if (key.includes('spark') || key.includes('plug')) return 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&auto=format';
    if (key.includes('oil')) return 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&h=600&fit=crop&auto=format';
    if (key.includes('battery') || key.includes('electrical')) return 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=600&fit=crop&auto=format';
    if (key.includes('suspension') || key.includes('wheel')) return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop&auto=format';
    return 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&h=600&fit=crop&auto=format';
  }

  private normalizeCategory(value: string): string {
    const v = String(value || '').toLowerCase().replace(/[_-]/g, ' ');
    if (v.includes('brake')) return 'Brakes';
    if (v.includes('filter')) return 'Filters';
    if (v.includes('engine')) return 'Engine';
    if (v.includes('suspension')) return 'Suspension';
    if (v.includes('electrical') || v.includes('battery')) return 'Electrical';
    if (v.includes('fluid') || v.includes('oil')) return 'Fluids';
    if (v.includes('body')) return 'Body';
    return value || 'Engine';
  }

  private normalizeType(value: string): Product['type'] {
    if (value === 'Original' || value === 'OEM' || value === 'Aftermarket') return value;
    return 'Aftermarket';
  }

  toProduct(raw: any): Product {
    const category = this.normalizeCategory(raw.category);
    const name = raw.name ?? '';
    const rawImage = String(raw.img ?? raw.image ?? '');
    const image = rawImage.startsWith('http') ? rawImage : this.imageFor(category, name);
    return {
      id: String(raw._id ?? raw.id),
      name,
      brand: raw.brand ?? '',
      category,
      type: this.normalizeType(raw.type),
      price: Number(raw.price ?? 0),
      stock: Number(raw.stock ?? 0),
      image,
      compatibleCars: Array.isArray(raw.compatibleCars)
        ? raw.compatibleCars.map((c: any) => typeof c === 'string' ? c : `${c.make ?? ''} ${Array.isArray(c.model) ? c.model.join(', ') : c.model ?? ''}`.trim())
        : [],
      description: raw.description ?? '',
      rating: Number(raw.rating ?? 0),
      reviewCount: Number(raw.reviewCount ?? 0),
    };
  }

  getSpareParts() {
    return this.api.http.get<any>(`${this.api.baseUrl}/spareParts`);
  }

  getSparePartById(id: string) {
    return this.api.http.get<any>(`${this.api.baseUrl}/spareParts/${id}`);
  }

  addSparePart(part: any) {
    return this.api.http.post<any>(`${this.api.baseUrl}/spareParts`, part, { headers: this.api.headers() });
  }

  updateSparePart(id: string, part: any) {
    return this.api.http.put<any>(`${this.api.baseUrl}/spareParts/${id}`, part, { headers: this.api.headers() });
  }

  deleteSparePart(id: string) {
    return this.api.http.delete<any>(`${this.api.baseUrl}/spareParts/${id}`, { headers: this.api.headers() });
  }
}
