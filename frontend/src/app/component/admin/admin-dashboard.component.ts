import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import * as L from 'leaflet';

import { HttpService } from '../../service/http.service';
import { EmergencyService } from '../../service/emergency.service';
import { Emergency } from '../../model/emergency.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly api = inject(HttpService);
  private readonly emergencyService = inject(EmergencyService);

  readonly loading = signal(true);

  readonly stats = signal([
    { title: 'Users', value: 0, icon: 'users' },
    { title: 'Technicians', value: 0, icon: 'wrench' },
    { title: 'Spare Parts', value: 0, icon: 'package' },
    { title: 'Orders', value: 0, icon: 'shopping-cart' },
    { title: 'Emergency Requests', value: 0, icon: 'alert' },
  ]);

  private map!: L.Map;

  ngOnInit(): void {
    this.loadStats();

    setTimeout(() => {
      this.initMap();
      this.loadEmergencies();
    }, 0);
  }

  loadStats(): void {
    this.loading.set(true);

    forkJoin({
      users: this.api.http.get<any>(`${this.api.baseUrl}/users`, { headers: this.api.headers() }),

      parts: this.api.http.get<any>(`${this.api.baseUrl}/spareParts`),

      orders: this.api.http.get<any>(`${this.api.baseUrl}/orders`, { headers: this.api.headers() }),

      emergencies: this.api.http.get<any>(`${this.api.baseUrl}/emergency/all`, {
        headers: this.api.headers(),
      }),
    }).subscribe({
      next: (r) => {
        const users = Array.isArray(r.users) ? r.users : (r.users?.data ?? []);

        const parts = Array.isArray(r.parts) ? r.parts : (r.parts?.data ?? []);

        const orders = Array.isArray(r.orders) ? r.orders : (r.orders?.data ?? []);

        const emergencies = Array.isArray(r.emergencies)
          ? r.emergencies
          : (r.emergencies?.data ?? []);

        this.stats.set([
          {
            title: 'Users',
            value: users.length,
            icon: 'users',
          },

          {
            title: 'Technicians',
            value: users.filter((u: any) => u.role === 'technician').length,
            icon: 'wrench',
          },

          {
            title: 'Spare Parts',
            value: parts.length,
            icon: 'package',
          },

          {
            title: 'Orders',
            value: orders.length,
            icon: 'shopping-cart',
          },

          {
            title: 'Emergency Requests',
            value: emergencies.length,
            icon: 'alert',
          },
        ]);

        this.loading.set(false);
      },

      error: () => {
        this.loading.set(false);
      },
    });
  }

  initMap(): void {
    this.map = L.map('emergency-map').setView([30.056851, 30.964658], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 100);
  }

  loadEmergencies(): void {
    this.emergencyService.getAllRequests().subscribe({
      next: (response) => {
        console.log('EMERGENCY RESPONSE:', response);

        const emergencies = Array.isArray(response) ? response : (response?.data ?? []);

        console.log('EMERGENCIES:', emergencies);

        emergencies.forEach((raw: any) => {
          console.log('RAW EMERGENCY:', raw);

          const emergency = this.emergencyService.toEmergency(raw);

          console.log('CONVERTED EMERGENCY:', emergency);

          this.addEmergencyMarker(emergency);
        });
      },

      error: (error) => {
        console.error('ERROR LOADING EMERGENCIES:', error);
      },
    });
  }

  addEmergencyMarker(emergency: Emergency): void {
    const lat = emergency.coordinates.lat;
    const lng = emergency.coordinates.lng;

    if (!lat || !lng) {
      return;
    }

    const emergencyIcon = L.divIcon({
      className: '',
      html: `
      <div style="
        font-size: 30px;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        🚨
      </div>
    `,
      iconSize: [35, 35],
      iconAnchor: [17, 35],
    });

    const marker = L.marker([lat, lng], {
      icon: emergencyIcon,
    }).addTo(this.map);

    marker.bindPopup(`
    <b>🚨 Emergency Request</b>
    <br><br>
    <b>Customer:</b> ${emergency.customerName}
    <br>
    <b>Phone:</b> ${emergency.customerPhone}
    <br>
    <b>Problem:</b> ${emergency.problemType}
    <br>
    <b>Priority:</b> ${emergency.priority}
    <br>
    <b>Status:</b> ${emergency.status}
  `);
  }
  go(path: string): void {
    void this.router.navigateByUrl(path);
  }
}
