import { Component, inject, OnInit, signal } from '@angular/core'
import { Router } from '@angular/router'
import { SessionService } from '../../service/session.service'
import { VehicleService } from '../../service/vehicle.service'
import { EmergencyService } from '../../service/emergency.service'
import type { Priority, ProblemType } from '../../model/emergency.model'
import type { Vehicle } from '../../model/vehicle.model'
import {
  ButtonComponent,
  SelectComponent,
  TextareaComponent
} from '../shared/components/ui.components'

@Component({
  selector: 'app-emergency-request',
  imports: [ButtonComponent, SelectComponent, TextareaComponent],
  templateUrl: './emergency-request.component.html'
})
export class EmergencyRequestComponent implements OnInit {
  private readonly router = inject(Router)
  private readonly session = inject(SessionService)
  private readonly vehicleService = inject(VehicleService)
  private readonly emergencyService = inject(EmergencyService)
  readonly problemType = signal<ProblemType | null>(null)
  readonly priority = signal<Priority>('Medium')
  readonly myVehicles = signal<Vehicle[]>([])
  vehicle = ''
  manualVehicleType = ''
  description = ''
  location = ''
  readonly locating = signal(false)
  readonly submitting = signal(false)
  readonly submitted = signal(false)
  readonly requestId = signal('')
  readonly error = signal('')

  readonly problemTypes: { type: ProblemType; icon: string; desc: string }[] = [
    { type: 'Flat Tire', icon: '🛞', desc: 'Tire puncture or blowout' },
    { type: 'Dead Battery', icon: '🔋', desc: "Car won't start" },
    { type: 'Engine Failure', icon: '⚙️', desc: 'Engine issues or stall' },
    { type: 'Overheating', icon: '🌡️', desc: 'Temperature warning' },
    { type: 'Empty Fuel', icon: '⛽', desc: 'Ran out of fuel' },
    { type: 'Car Accident', icon: '🚨', desc: 'Collision or damage' },
    { type: 'Locked Out', icon: '🔑', desc: 'Keys locked inside' },
    { type: 'Brake Failure', icon: '🛑', desc: 'Brakes not responding' },
    { type: 'Transmission Problem', icon: '🔧', desc: 'Gear or transmission issues' },
    { type: 'Other', icon: '❓', desc: 'Other vehicle problem' }
  ]
  readonly priorities: { value: Priority; label: string; color: string; desc: string }[] = [
    { value: 'Low', label: 'Low', color: 'border-subtle text-muted', desc: 'Not urgent, can wait' },
    {
      value: 'Medium',
      label: 'Medium',
      color: 'border-info/40 text-info',
      desc: 'Needs attention soon'
    },
    {
      value: 'High',
      label: 'High',
      color: 'border-warning/40 text-warning',
      desc: 'Urgent, within the hour'
    },
    {
      value: 'Critical',
      label: 'Critical',
      color: 'border-danger/50 text-danger',
      desc: 'Immediate help needed'
    }
  ]

  ngOnInit (): void {
    const userId = this.session.user()?.id
    if (!userId) return
    this.vehicleService
      .getMyVehicles(userId)
      .subscribe({
        next: res =>
          this.myVehicles.set((res?.data ?? []).map((v: any) => this.vehicleService.toVehicle(v)))
      })
  }

  get vehicleOptions () {
    return [
      { value: '', label: 'Select your vehicle' },
      ...this.myVehicles().map(v => ({
        value: v.id,
        label: `${v.year} ${v.make} ${v.model} - ${v.licensePlate}`
      }))
    ]
  }

  onVehicleChange (value: string): void {
    this.vehicle = value
    if (value) this.manualVehicleType = ''
  }

  onManualVehicleChange (value: string): void {
    this.manualVehicleType = value
    if (value.trim()) this.vehicle = ''
  }

  locate (): void {
    this.error.set('')
    this.locating.set(true)
    if (!navigator.geolocation) {
      this.locating.set(false)
      this.error.set('GPS is not supported by this browser. Please enter your location manually.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.location = `Current location (${pos.coords.latitude.toFixed(
          6
        )}, ${pos.coords.longitude.toFixed(6)})`
        this.locating.set(false)
      },
      () => {
        this.locating.set(false)
        this.error.set(
          'Could not get your GPS location. Please allow location access or enter it manually.'
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  private problemValue (value: ProblemType): string {
    const map: Record<string, string> = {
      'Flat Tire': 'flat_tire',
      'Dead Battery': 'dead_battery',
      'Engine Failure': 'engine_problem',
      'Empty Fuel': 'fuel_problem',
      'Car Accident': 'accident',
      Other: 'other',
      Overheating: 'other',
      'Locked Out': 'other',
      'Brake Failure': 'other',
      'Transmission Problem': 'other'
    }
    return map[value] ?? 'other'
  }

  submit (): void {
    const hasRegisteredVehicle = !!this.vehicle
    const hasManualVehicle = !!this.manualVehicleType.trim()
    if (!this.problemType() || (!hasRegisteredVehicle && !hasManualVehicle)) {
      this.error.set('Please select a registered vehicle or enter your vehicle type manually.')
      return
    }
    if (!this.location.trim()) {
      this.error.set('Please get your GPS location or enter your location manually.')
      return
    }
    this.error.set('')
    this.submitting.set(true)
    const coords = this.location.match(/(-?\d+\.\d+),\s*(-?\d+\.\d+)/)
    const payload: any = {
      ...(hasRegisteredVehicle
        ? { vehicleID: this.vehicle }
        : { vehicleType: this.manualVehicleType.trim() }),
      problemType: this.problemValue(this.problemType()!),
      description: this.description.trim() || 'Emergency assistance requested.',
      priority: this.priority().toLowerCase(),
      location: {
        latitude: coords ? Number(coords[1]) : 30.0444,
        longitude: coords ? Number(coords[2]) : 31.2357,
        address: this.location.trim()
      }
    }
    this.emergencyService.createRequest(payload).subscribe({
      next: res => {
        this.requestId.set(String(res?.data?._id ?? res?.data?.id ?? 'Created'))
        this.submitting.set(false)
        this.submitted.set(true)
      },
      error: err => {
        this.submitting.set(false)
        this.error.set(
          typeof err.error === 'string'
            ? err.error
            : err.error?.error || err.error?.message || 'Could not submit emergency request.'
        )
      }
    })
  }

  go (path: string): void {
    void this.router.navigateByUrl(path)
  }
}
