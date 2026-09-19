import type { Role } from './role.model';

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
