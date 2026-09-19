import type { Vehicle } from './vehicle.model';

export type EmergencyStatus =
  | 'Pending'
  | 'Accepted'
  | 'On The Way'
  | 'Arrived'
  | 'In Service'
  | 'Completed'
  | 'Cancelled';

export type ProblemType =
  | 'Flat Tire'
  | 'Dead Battery'
  | 'Engine Failure'
  | 'Overheating'
  | 'Empty Fuel'
  | 'Car Accident'
  | 'Locked Out'
  | 'Brake Failure'
  | 'Transmission Problem'
  | 'Other';

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface StatusHistoryEntry {
  status: EmergencyStatus;
  time: string;
  note?: string;
}

export interface Emergency {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  technicianId?: string;
  technicianName?: string;
  technicianPhone?: string;
  vehicle: Vehicle;
  problemType: ProblemType;
  description: string;
  priority: Priority;
  location: {
    latitude: number
    longitude: number
    address: string
}
  coordinates: { lat: number; lng: number };
  status: EmergencyStatus;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
}
