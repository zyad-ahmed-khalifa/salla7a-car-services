import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import type { Role } from '../model/role.model';
import type { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly userSignal = signal<User | null>(null);
  private readonly http = inject(HttpService);
  private readonly router = inject(Router);

  readonly user = this.userSignal.asReadonly();
  readonly role = computed<Role>(() => this.userSignal()?.role ?? 'guest');
  readonly isLoggedIn = computed(() => this.userSignal() !== null);

  constructor() { this.restore(); }

  private normalize(raw: any): User {
    const role: Role = ['admin', 'technician', 'customer'].includes(raw.role) ? raw.role : 'customer';
    return {
      id: String(raw._id ?? raw.id ?? ''),
      name: raw.name ?? '',
      email: raw.email ?? '',
      phone: raw.phone ?? '',
      role,
      status: raw.status === 'Inactive' ? 'Inactive' : 'Active',
      address: raw.address ?? '',
      createdAt: raw.createdAt ?? new Date().toISOString(),
    };
  }

  restore(): void {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      if (payload?.exp && payload.exp * 1000 < Date.now()) { this.logout(false); return; }
      this.userSignal.set(this.normalize(payload));
    } catch { this.logout(false); return; }
    this.http.http.get<any>(`${this.http.baseUrl}/profile`, { headers: this.http.headers() }).subscribe({
      next: (user) => this.userSignal.set(this.normalize(user)),
      error: () => this.logout(false),
    });
  }

  login(email: string, password: string, onError?: (message: string) => void): void {
    this.http.http.post<any>(`${this.http.baseUrl}/login`, { email, password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.http.http.get<any>(`${this.http.baseUrl}/profile`, { headers: this.http.headers() }).subscribe({
          next: (user) => {
            const normalized = this.normalize(user);
            this.userSignal.set(normalized);
            this.navigateByRole(normalized.role);
          },
          error: () => onError?.('Could not load your profile.'),
        });
      },
      error: (err) => onError?.(typeof err.error === 'string' ? err.error : 'Login failed.'),
    });
  }

  register(data: { name: string; email: string; phone: string; password: string }, onError?: (message: string) => void): void {
    this.http.http.post<any>(`${this.http.baseUrl}/users`, data).subscribe({
      next: () => this.login(data.email, data.password, onError),
      error: (err) => onError?.(typeof err.error === 'string' ? err.error : 'Registration failed.'),
    });
  }

  private navigateByRole(role: Role): void {
    if (role === 'admin') void this.router.navigateByUrl('/admin/dashboard');
    else if (role === 'technician') void this.router.navigateByUrl('/technician/dashboard');
    else void this.router.navigateByUrl('/customer/products');
  }

  logout(navigate = true): void {
    localStorage.removeItem('token');
    this.userSignal.set(null);
    if (navigate) void this.router.navigateByUrl('/');
  }
}
