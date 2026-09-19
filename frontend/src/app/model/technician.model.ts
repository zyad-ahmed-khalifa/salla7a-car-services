import type { User } from './user.model';

export interface Technician extends User {
  specialization: string[];
  experienceYears: number;
  rating: number;
  completedServices: number;
  serviceArea: string;
  availability: 'Available' | 'Busy' | 'Offline';
}
