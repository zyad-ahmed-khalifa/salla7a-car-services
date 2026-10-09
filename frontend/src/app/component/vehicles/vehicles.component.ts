import { Component, inject, OnInit, signal } from '@angular/core';
import { SessionService } from '../../service/session.service';
import { VehicleService } from '../../service/vehicle.service';
import type { Vehicle } from '../../model/vehicle.model';
import { AlertComponent, ButtonComponent, ConfirmComponent, EmptyStateComponent, InputComponent, ModalComponent, SelectComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-vehicles',
  imports: [AlertComponent, ButtonComponent, ConfirmComponent, EmptyStateComponent, InputComponent, ModalComponent, SelectComponent],
  templateUrl: './vehicles.component.html',
})
export class VehiclesComponent implements OnInit {
  private readonly session = inject(SessionService);
  private readonly service = inject(VehicleService);
  readonly myVehicles = signal<Vehicle[]>([]);
  readonly showModal = signal(false);
  readonly editing = signal<Vehicle | null>(null);
  readonly confirmDelete = signal<string | null>(null);
  readonly saved = signal(false);
  readonly error = signal('');
  readonly saving = signal(false);
  make = 'Toyota'; model = ''; year = '2022'; licensePlate = ''; color = 'White'; vin = '';
  readonly makes = ['Toyota', 'Honda', 'Ford', 'Nissan', 'Hyundai', 'Kia', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Volkswagen'].map((m) => ({ value: m, label: m }));
  readonly colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Other'].map((c) => ({ value: c, label: c }));

  ngOnInit(): void { this.load(); }

  load(): void {
    const userId = this.session.user()?.id;
    if (!userId) return;
    this.service.getMyVehicles(userId).subscribe({
      next: (res) => this.myVehicles.set((res?.data ?? []).map((v: any) => this.service.toVehicle(v))),
      error: (err) => this.error.set(typeof err.error === 'string' ? err.error : 'Could not load your vehicles.')
    });
  }

  openAdd(): void {
    this.editing.set(null); this.make = 'Toyota'; this.model = ''; this.year = '2022'; this.licensePlate = ''; this.color = 'White'; this.vin = ''; this.error.set(''); this.showModal.set(true);
  }

  openEdit(v: Vehicle): void {
    this.editing.set(v); this.make = v.make; this.model = v.model; this.year = String(v.year); this.licensePlate = v.licensePlate; this.color = v.color; this.vin = v.vin || ''; this.error.set(''); this.showModal.set(true);
  }

  save(): void {
    if (!this.make || !this.model.trim() || !this.licensePlate.trim() || !this.year) {
      this.error.set('Please complete make, model, year and license plate.');
      return;
    }
    const yearNumber = Number(this.year);
    const currentYear = new Date().getFullYear();
    if (!Number.isInteger(yearNumber) || yearNumber < 1990 || yearNumber > currentYear + 1) {
      this.error.set(`Year must be between 1990 and ${currentYear + 1}.`);
      return;
    }
    this.error.set(''); this.saving.set(true);
    const data = { make: this.make, model: this.model.trim(), year: Number(this.year), licensePlate: this.licensePlate.trim(), color: this.color, vin: this.vin.trim() };
    const request = this.editing() ? this.service.updateVehicle(this.editing()!.id, data) : this.service.addVehicle(data);
    request.subscribe({
      next: () => { this.showModal.set(false); this.saving.set(false); this.saved.set(true); this.load(); setTimeout(() => this.saved.set(false), 3000); },
      error: (err) => { this.saving.set(false); this.error.set(typeof err.error === 'string' ? err.error : err.error?.message || 'Could not save vehicle.'); }
    });
  }

  delete(id: string): void {
    this.service.deleteVehicle(id).subscribe({
      next: () => { this.confirmDelete.set(null); this.load(); },
      error: (err) => this.error.set(typeof err.error === 'string' ? err.error : 'Could not delete vehicle.')
    });
  }
}
