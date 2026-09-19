import { Injectable } from '@angular/core';
import { technicians } from '../model/mock-data';

@Injectable({ providedIn: 'root' })
export class TechnicianService {
  readonly technicians = technicians;
}
