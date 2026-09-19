import { Component, signal } from '@angular/core';
import { technicians } from '../../model/mock-data';
import type { Technician } from '../../model/technician.model';
import { AlertComponent, AvatarComponent, ButtonComponent, InputComponent, StarsComponent } from '../shared/components/ui.components';

@Component({
  selector: 'app-tech-profile',
  imports: [AlertComponent, AvatarComponent, ButtonComponent, InputComponent, StarsComponent],
  templateUrl: './tech-profile.component.html',
})
export class TechProfileComponent {
  readonly tech: Technician = technicians[0];
  readonly editing = signal(false);
  readonly saved = signal(false);
  readonly availability = signal(this.tech.availability);
  name = this.tech.name;
  phone = this.tech.phone;
  email = this.tech.email;
  address = this.tech.address || '';
  serviceArea = this.tech.serviceArea;
  readonly states = ['Available', 'Busy', 'Offline'] as const;

  save(): void {
    this.saved.set(true);
    this.editing.set(false);
    setTimeout(() => this.saved.set(false), 3000);
  }
}
