export type Role = 'guest' | 'customer' | 'technician' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: 'Active' | 'Inactive';
  avatar?: string;
  address?: string;
  createdAt: string;
}

export interface Technician extends User {
  specialization: string[];
  experienceYears: number;
  rating: number;
  completedServices: number;
  serviceArea: string;
  availability: 'Available' | 'Busy' | 'Offline';
}

export interface Vehicle {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  vin?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: 'Original' | 'OEM' | 'Aftermarket';
  price: number;
  stock: number;
  image: string;
  compatibleCars: string[];
  description: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  date: string;
  address: string;
  vehicle: string;
}

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
  location: string;
  coordinates: { lat: number; lng: number };
  status: EmergencyStatus;
  createdAt: string;
  updatedAt: string;
  statusHistory: StatusHistoryEntry[];
}

export interface SelectOption {
  value: string;
  label: string;
}
