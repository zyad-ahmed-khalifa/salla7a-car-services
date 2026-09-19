import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { EmergencyService } from '../../service/emergency.service';
import type { Emergency, EmergencyStatus } from '../../model/emergency.model';
import { AlertComponent, AvatarComponent, BadgeComponent, ButtonComponent, EmptyStateComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-current-emergency',
  imports: [AlertComponent, AvatarComponent, BadgeComponent, ButtonComponent, EmptyStateComponent],
  templateUrl: './current-emergency.component.html'
})
export class CurrentEmergencyComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly service = inject(EmergencyService);

  readonly job = signal<Emergency | null>(null);
  readonly status = signal<EmergencyStatus>('Accepted');
  readonly updating = signal(false);
  readonly alert = signal('');

  readonly statusFlow: EmergencyStatus[] = ['Pending', 'Accepted', 'On The Way', 'Arrived', 'In Service', 'Completed'];

  readonly actions: Partial<Record<EmergencyStatus, { next: EmergencyStatus; label: string; color: 'primary' | 'success' }>> = {
    Accepted: { next: 'On The Way', label: 'Start Driving', color: 'primary' },
    'On The Way': { next: 'Arrived', label: "I've Arrived", color: 'primary' },
    Arrived: { next: 'In Service', label: 'Start Service', color: 'primary' },
    'In Service': { next: 'Completed', label: 'Mark as Completed', color: 'success' }
  };

  constructor(
  private sanitizer: DomSanitizer
) {}
  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.service.getTechnicianRequests().subscribe({
      next: (r) => {
        const list = (r?.data ?? []).map((x: any) => this.service.toEmergency(x));
        const active = list.find((e: Emergency) => !['Completed', 'Cancelled'].includes(e.status)) ?? null;
        this.job.set(active);
        this.status.set(active?.status ?? 'Accepted');
      },
      error: () => {
        this.job.set(null);
        this.alert.set('Could not load your current emergency request.');
      }
    });
  }

  currentIdx(): number {
    return this.statusFlow.indexOf(this.status());
  }

  action() {
    return this.actions[this.status()];
  }

  update(): void {
    const action = this.action();
    const emergency = this.job();
    if (!action || !emergency) return;

    const backendStatus: Record<EmergencyStatus, string> = {
      Pending: 'pending',
      Accepted: 'accepted',
      'On The Way': 'on_the_way',
      Arrived: 'arrived',
      'In Service': 'in_service',
      Completed: 'completed',
      Cancelled: 'cancelled'
    };

    this.updating.set(true);
    this.service.updateStatus(emergency.id, backendStatus[action.next]).subscribe({
      next: (r) => {
        const updated = this.service.toEmergency(r?.data ?? {});
        this.job.set(updated.status === 'Completed' ? null : updated);
        this.status.set(updated.status);
        this.alert.set(`Status updated to: ${updated.status}`);
        this.updating.set(false);
      },
      error: (err) => {
        this.updating.set(false);
        this.alert.set(typeof err.error === 'string' ? err.error : err.error?.message || 'Could not update status.');
      }
    });
  }

  goAvailable(): void {
    void this.router.navigateByUrl('/technician/emergencies');
  }
  getMapUrl(
  latitude: number,
  longitude: number
): SafeResourceUrl {
  const url =
    `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;

  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}
}
