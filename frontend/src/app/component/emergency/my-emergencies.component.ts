import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmergencyService } from '../../service/emergency.service';
import type { Emergency } from '../../model/emergency.model';
import { AvatarComponent, BadgeComponent, ButtonComponent, EmptyStateComponent, TabsComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-my-emergencies', imports: [AvatarComponent, BadgeComponent, ButtonComponent, EmptyStateComponent, TabsComponent], templateUrl: './my-emergencies.component.html' })
export class MyEmergenciesComponent implements OnInit {
  private readonly router = inject(Router); private readonly service = inject(EmergencyService);
  readonly tab = signal('Active'); readonly selected = signal<Emergency | null>(null); readonly all = signal<Emergency[]>([]);
  readonly active = computed(() => this.all().filter(e => !['Completed','Cancelled'].includes(e.status)));
  readonly history = computed(() => this.all().filter(e => ['Completed','Cancelled'].includes(e.status)));
  readonly list = computed(() => this.tab() === 'Active' ? this.active() : this.history());
  ngOnInit(): void { this.load(); }
  load(): void { this.service.getMyRequests().subscribe({ next: r => this.all.set((r?.data ?? []).map((x:any) => this.service.toEmergency(x))) }); }
  formatDate(value: string): string { return new Date(value).toLocaleString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' }); }
  goRequest(): void { void this.router.navigateByUrl('/customer/emergencies/request'); }
}
