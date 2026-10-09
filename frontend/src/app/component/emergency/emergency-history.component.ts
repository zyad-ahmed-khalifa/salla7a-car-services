import { Component, inject, OnInit, signal } from '@angular/core';
import { EmergencyService } from '../../service/emergency.service';
import type { Emergency } from '../../model/emergency.model';
import { BadgeComponent, EmptyStateComponent, SearchBarComponent } from '../shared/components/ui.components';
@Component({ selector:'app-emergency-history', imports:[BadgeComponent,EmptyStateComponent,SearchBarComponent], templateUrl:'./emergency-history.component.html' })
export class EmergencyHistoryComponent implements OnInit {
  private readonly service=inject(EmergencyService); readonly search=signal(''); readonly statusFilter=signal('All'); readonly selected=signal<Emergency|null>(null); readonly myHistory=signal<Emergency[]>([]);
  ngOnInit():void { this.service.getMyRequests().subscribe({next:r=>this.myHistory.set((r?.data??[]).map((x:any)=>this.service.toEmergency(x)).filter((e:Emergency)=>['Completed','Cancelled'].includes(e.status))) }); }
  filtered():Emergency[]{const q=this.search().toLowerCase();return this.myHistory().filter(e=>(e.id.toLowerCase().includes(q)||e.customerName.toLowerCase().includes(q)||e.problemType.toLowerCase().includes(q))&&(this.statusFilter()==='All'||e.status===this.statusFilter()));}
  minutes(e:Emergency):number{return Math.max(0,Math.round((new Date(e.updatedAt).getTime()-new Date(e.createdAt).getTime())/60000));}
}
