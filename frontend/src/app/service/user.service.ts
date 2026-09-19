import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import type { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly api = inject(HttpService);
  getUsers() { return this.api.http.get<User[]>(`${this.api.baseUrl}/users`, { headers: this.api.headers() }); }
  updateUser(id: string, data: Partial<User>) { return this.api.http.put<User>(`${this.api.baseUrl}/users/${id}`, data, { headers: this.api.headers() }); }
  deleteUser(id: string) { return this.api.http.delete(`${this.api.baseUrl}/users/${id}`, { headers: this.api.headers(), responseType: 'text' }); }
  createTechnician(data: {name:string;email:string;phone:string;password:string;address?:string}) { return this.api.http.post<any>(`${this.api.baseUrl}/users/technicians`, data, { headers: this.api.headers() }); }
  createAdmin(data: {name:string;email:string;phone:string;password:string;address?:string}) { return this.api.http.post<any>(`${this.api.baseUrl}/users/admins`, data, { headers: this.api.headers() }); }
}
