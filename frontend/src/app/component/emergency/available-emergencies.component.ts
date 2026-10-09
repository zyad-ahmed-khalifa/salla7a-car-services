import { Component, inject, OnInit, signal } from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { EmergencyService } from '../../service/emergency.service'
import type { Emergency } from '../../model/emergency.model'
import {
  BadgeComponent,
  ButtonComponent,
  EmptyStateComponent,
  ModalComponent,
  SearchBarComponent
} from '../shared/components/ui.components'

@Component({
  selector: 'app-available-emergencies',
  imports: [
    BadgeComponent,
    ButtonComponent,
    EmptyStateComponent,
    ModalComponent,
    SearchBarComponent
  ],
  templateUrl: './available-emergencies.component.html'
})
export class AvailableEmergenciesComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly service = inject(EmergencyService)
  readonly search = signal('')
  readonly priorityFilter = signal('All')
  readonly selected = signal<Emergency | null>(null)
  readonly accepting = signal(false)
  readonly pending = signal<Emergency[]>([])
  readonly error = signal('')
  constructor(private sanitizer: DomSanitizer) {}
  ngOnInit (): void {
    this.load()
  }
  load (): void {
    this.service
      .getAvailableRequests()
      .subscribe({
        next: r => this.pending.set((r?.data ?? []).map((x: any) => this.service.toEmergency(x))),
        error: e =>
          this.error.set(typeof e.error === 'string' ? e.error : 'Could not load requests.')
      })
  }
  filtered (): Emergency[] {
    const q = this.search().toLowerCase()
    return this.pending().filter(
      e =>
        (e.problemType.toLowerCase().includes(q) || e.customerName.toLowerCase().includes(q)) &&
        (this.priorityFilter() === 'All' || e.priority === this.priorityFilter())
    )
  }
  accept (): void {
    const e = this.selected()
    if (!e) return
    this.accepting.set(true)
    this.service.acceptRequest(e.id).subscribe({
      next: () => {
        this.accepting.set(false)
        this.selected.set(null)
        this.load()
        void this.router.navigateByUrl('/technician/current')
      },
      error: err => {
        this.accepting.set(false)
        this.error.set(
          typeof err.error === 'string'
            ? err.error
            : err.error?.message || 'Could not accept request.'
        )
      }
    })
  }
    getMapUrl(latitude: number, longitude: number): SafeResourceUrl {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
