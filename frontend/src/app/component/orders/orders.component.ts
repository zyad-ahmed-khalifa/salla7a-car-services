import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { OrderService } from '../../service/order.service';
import type { Order } from '../../model/order.model';
import { BadgeComponent, ButtonComponent, EmptyStateComponent, SearchBarComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-orders', imports: [BadgeComponent, ButtonComponent, EmptyStateComponent, SearchBarComponent], templateUrl: './orders.component.html' })
export class OrdersComponent implements OnInit {
  private readonly service = inject(OrderService);
  readonly search = signal(''); readonly statusFilter = signal('All'); readonly selected = signal<Order | null>(null); readonly orders = signal<Order[]>([]); readonly loading = signal(true);
  readonly statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']; readonly statusFlow = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  readonly filtered = computed(() => this.orders().filter(o => { const q=this.search().toLowerCase().trim(); return (!q || `${o.id} ${o.vehicle} ${o.address}`.toLowerCase().includes(q)) && (this.statusFilter()==='All' || o.status===this.statusFilter()); }));
  ngOnInit(): void { this.service.getOrders().subscribe({ next: res => { this.orders.set((res?.data ?? []).map((x:any)=>this.service.mapOrder(x))); this.loading.set(false); }, error:()=>this.loading.set(false) }); }
  statusIdx(order: Order): number { return this.statusFlow.indexOf(order.status); }
}
