import { Injectable, inject } from '@angular/core'
import { HttpService } from './http.service'
import type { Emergency, EmergencyStatus, Priority, ProblemType } from '../model/emergency.model'

@Injectable({ providedIn: 'root' })
export class EmergencyService {
  private readonly api = inject(HttpService)

  createRequest (data: any) {
    return this.api.http.post<any>(`${this.api.baseUrl}/emergency/create`, data, {
      headers: this.api.headers()
    })
  }

  getMyRequests () {
    return this.api.http.get<any>(`${this.api.baseUrl}/emergency/get/my`, {
      headers: this.api.headers()
    })
  }

  getTechnicianRequests () {
    return this.api.http.get<any>(`${this.api.baseUrl}/emergency/technician/my`, {
      headers: this.api.headers()
    })
  }

  getAvailableRequests () {
    return this.api.http.get<any>(`${this.api.baseUrl}/emergency/available`, {
      headers: this.api.headers()
    })
  }

  getAllRequests () {
    return this.api.http.get<any>(`${this.api.baseUrl}/emergency/all`, {
      headers: this.api.headers()
    })
  }

  acceptRequest (id: string) {
    return this.api.http.put<any>(
      `${this.api.baseUrl}/emergency/accept/${id}`,
      {},
      { headers: this.api.headers() }
    )
  }

  updateStatus (id: string, status: string) {
    return this.api.http.put<any>(
      `${this.api.baseUrl}/emergency/status/${id}`,
      { status },
      { headers: this.api.headers() }
    )
  }

  deleteRequest (id: string) {
    return this.api.http.delete<any>(`${this.api.baseUrl}/emergency/delete/${id}`, {
      headers: this.api.headers()
    })
  }

  editRequest (id: string, data: any) {
    return this.api.http.put<any>(`${this.api.baseUrl}/emergency/edit/${id}`, data, {
      headers: this.api.headers()
    })
  }

  toEmergency (raw: any): Emergency {
    const statusMap: Record<string, EmergencyStatus> = {
      pending: 'Pending',
      accepted: 'Accepted',
      on_the_way: 'On The Way',
      arrived: 'Arrived',
      in_service: 'In Service',
      in_progress: 'In Service',
      completed: 'Completed',
      cancelled: 'Cancelled',
      Pending: 'Pending',
      Accepted: 'Accepted',
      'On The Way': 'On The Way',
      Arrived: 'Arrived',
      'In Service': 'In Service',
      Completed: 'Completed',
      Cancelled: 'Cancelled'
    }

    const problemMap: Record<string, ProblemType> = {
      flat_tire: 'Flat Tire',
      dead_battery: 'Dead Battery',
      engine_problem: 'Engine Failure',
      fuel_problem: 'Empty Fuel',
      accident: 'Car Accident',
      other: 'Other'
    }

    const priorityMap: Record<string, Priority> = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical',
      Low: 'Low',
      Medium: 'Medium',
      High: 'High',
      Critical: 'Critical'
    }

    const v = raw.vehicleID && typeof raw.vehicleID === 'object' ? raw.vehicleID : {}
    const t =
      raw.technicianInfo?.technicianID && typeof raw.technicianInfo.technicianID === 'object'
        ? raw.technicianInfo.technicianID
        : {}
    const u = raw.userID && typeof raw.userID === 'object' ? raw.userID : {}
    const vehicleId = typeof raw.vehicleID === 'string' ? raw.vehicleID : v._id ?? v.id ?? ''
    const technicianId =
      typeof raw.technicianInfo?.technicianID === 'string'
        ? raw.technicianInfo.technicianID
        : t._id ?? t.id ?? undefined

    return {
      id: String(raw._id ?? raw.id ?? ''),
      customerId: String(u._id ?? u.id ?? (typeof raw.userID === 'string' ? raw.userID : '')),
      customerName: u.name ?? raw.customerName ?? '',
      customerPhone: u.phone ?? raw.customerPhone ?? '',
      technicianId: technicianId ? String(technicianId) : undefined,
      technicianName: t.name ?? '',
      technicianPhone: t.phone ?? '',
      vehicle: {
        id: String(vehicleId),
        ownerId: String(v.userId ?? ''),
        make: v.brand ?? v.make ?? raw.vehicleType ?? '',
        model: v.model ?? '',
        year: Number(v.year ?? 0),
        licensePlate: v.licensePlate ?? '',
        color: v.color ?? 'White',
        vin: v.vin ?? ''
      },
      problemType: problemMap[raw.problemType] ?? 'Other',
      description: raw.description ?? '',
      priority: priorityMap[raw.priority] ?? 'Medium',
      location: {
        latitude: Number(raw.location?.latitude ?? 0),
        longitude: Number(raw.location?.longitude ?? 0),
        address: raw.location?.address ?? ''
      },
      coordinates: {
        lat: Number(raw.location?.latitude ?? 0),
        lng: Number(raw.location?.longitude ?? 0)
      },
      status: statusMap[raw.status] ?? 'Pending',
      createdAt: raw.createdAt ?? raw.requestedAt ?? new Date().toISOString(),
      updatedAt: raw.updatedAt ?? raw.requestedAt ?? new Date().toISOString(),
      statusHistory: []
    }
  }
}
