import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private readonly api = inject(HttpService);

  getMyVehicles(userId: string) {
    return this.api.http.get<any>(`${this.api.baseUrl}/cars/${userId}`, { headers: this.api.headers() });
  }

  addVehicle(data: { make: string; model: string; year: number; licensePlate: string; color?: string; vin?: string }) {
    return this.api.http.post<any>(`${this.api.baseUrl}/cars`, {
      brand: data.make, model: data.model, year: data.year, licensePlate: data.licensePlate, color: data.color, vin: data.vin
    }, { headers: this.api.headers() });
  }

  updateVehicle(id: string, data: { make: string; model: string; year: number; licensePlate: string; color?: string; vin?: string }) {
    return this.api.http.put<any>(`${this.api.baseUrl}/cars/${id}`, {
      brand: data.make, model: data.model, year: data.year, licensePlate: data.licensePlate, color: data.color, vin: data.vin
    }, { headers: this.api.headers() });
  }

  deleteVehicle(id: string) {
    return this.api.http.delete<any>(`${this.api.baseUrl}/cars/${id}`, { headers: this.api.headers() });
  }

  toVehicle(raw: any) {
    return {
      id: String(raw._id ?? raw.id),
      ownerId: String(raw.userId ?? raw.ownerId ?? ''),
      make: raw.make ?? raw.brand ?? '',
      model: raw.model ?? '',
      year: Number(raw.year ?? 0),
      licensePlate: raw.licensePlate ?? '',
      color: raw.color ?? 'White',
      vin: raw.vin ?? ''
    };
  }
}
