import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import type { Order, OrderStatus } from '../model/order.model';
import { SparePartService } from './spare-part.service';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly api = inject(HttpService);
  private readonly parts = inject(SparePartService);

  getOrders() {
    return this.api.http.get<any>(`${this.api.baseUrl}/orders`, { headers: this.api.headers() });
  }

  createOrder(payload: any) {
    return this.api.http.post<any>(`${this.api.baseUrl}/orders`, payload, { headers: this.api.headers() });
  }

  updateStatus(id: string, status: OrderStatus) {
    return this.api.http.put<any>(`${this.api.baseUrl}/orders/${id}`, { orderStatus: status }, { headers: this.api.headers() });
  }

  deleteOrder(id: string) {
    return this.api.http.delete<any>(`${this.api.baseUrl}/orders/${id}`, { headers: this.api.headers() });
  }

  mapOrder(raw: any): Order {
    const items = Array.isArray(raw.items) ? raw.items.map((item: any) => ({
      product: this.parts.toProduct(item.partId ?? {}),
      quantity: Number(item.quantity ?? 0),
      price: Number(item.price ?? 0),
    })) : [];
    const subtotal = Number(raw.total ?? 0);
    const shipping = Number(raw.shippingCost ?? 0);
    return {
      id: String(raw._id ?? raw.id),
      customerId: String(raw.userId?._id ?? raw.userId ?? ''),
      customerName: raw.userId?.name ?? '',
      items,
      subtotal,
      shipping,
      total: Number(raw.totalPrice ?? subtotal + shipping),
      status: (raw.orderStatus ?? 'Pending') as OrderStatus,
      date: raw.createdAt ? new Date(raw.createdAt).toLocaleDateString() : '',
      address: raw.address ? `${raw.address.city}, ${raw.address.area}, Building ${raw.address.buildingNumber}, Floor ${raw.address.floor}, Apartment ${raw.address.apartmentNumber}` : '',
      vehicle: '—',
    };
  }
}
