import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { orders as initialOrders } from '../../model/mock-data';
import type { Order, OrderStatus } from '../../model/order.model';
import { OrderService } from '../../service/order.service';
import { ButtonComponent, ModalComponent, SearchBarComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-orders-management', imports: [ButtonComponent, ModalComponent, SearchBarComponent], templateUrl: './orders-management.component.html' })
export class OrdersManagementComponent implements OnInit {
  private readonly service=inject(OrderService);
  readonly search=signal(''); readonly statusFilter=signal('All'); readonly selected=signal<Order|null>(null); readonly orders=signal<Order[]>([]); readonly statuses=signal<Record<string,OrderStatus>>({});
  readonly statusOptions=[{value:'Pending',label:'Pending'},{value:'Processing',label:'Processing'},{value:'Shipped',label:'Shipped'},{value:'Delivered',label:'Delivered'},{value:'Cancelled',label:'Cancelled'}]; readonly chips=['All','Pending','Processing','Shipped','Delivered'] as const;
  readonly filtered=computed(()=>this.orders().filter(o=>{const q=this.search().toLowerCase().trim();return (!q||`${o.id} ${o.customerName}`.toLowerCase().includes(q))&&(this.statusFilter()==='All'||this.getStatus(o)===this.statusFilter());}));
  ngOnInit():void{this.load();}
  load():void{this.service.getOrders().subscribe({next:r=>this.orders.set((r?.data??[]).map((x:any)=>this.service.mapOrder(x)))});}
  getStatus(o:Order):OrderStatus{return this.statuses()[o.id]||o.status;}
  updateStatus(id:string,status:string):void{this.service.updateStatus(id,status as OrderStatus).subscribe({next:()=>{this.statuses.update(s=>({...s,[id]:status as OrderStatus}));this.load();}});}
  count(s:string):number{return s==='All'?this.orders().length:this.orders().filter(o=>this.getStatus(o)===s).length;}
  revenue():number{return this.orders().filter(o=>this.getStatus(o)==='Delivered').reduce((sum,o)=>sum+o.total,0);}
}
