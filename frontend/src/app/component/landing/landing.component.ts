import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { products } from '../../model/mock-data';
import { ButtonComponent, LogoComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-landing',
  imports: [ButtonComponent, LogoComponent],
  templateUrl: './landing.component.html',
})
export class LandingComponent {
  private readonly router = inject(Router);
  readonly products = products.slice(0, 4);
  readonly features = [
    { icon: '🔧', title: 'Genuine Spare Parts', desc: 'Thousands of original and OEM-grade parts sourced directly from certified suppliers worldwide.' },
    { icon: '🚨', title: 'Emergency Assistance', desc: "24/7 roadside help dispatched in minutes. Flat tire, dead battery, or breakdown — we've got you covered." },
    { icon: '🚗', title: 'Vehicle-Matched Parts', desc: 'Filter parts by your exact car make, model, and year to ensure perfect compatibility every time.' },
    { icon: '📍', title: 'Live Technician Tracking', desc: 'Track your assigned technician in real-time from acceptance to completion of your request.' },
  ];
  readonly stats = [
    { value: '50,000+', label: 'Spare Parts' },
    { value: '1,200+', label: 'Certified Technicians' },
    { value: '98%', label: 'Success Rate' },
    { value: '<15 min', label: 'Avg. Response Time' },
  ];
  readonly problemTypes = ['Flat Tire', 'Dead Battery', 'Engine Failure', 'Overheating', 'Empty Fuel', 'Car Accident'];

  go(path: string): void {
    void this.router.navigateByUrl(path);
  }

  typeClass(type: string): string {
    if (type === 'Original') return 'bg-success/10 text-success';
    if (type === 'OEM') return 'bg-info/10 text-info';
    return 'bg-muted/10 text-muted';
  }
}
