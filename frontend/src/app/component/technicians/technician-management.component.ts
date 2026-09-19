import { Component, inject, OnInit, signal } from '@angular/core';
import type { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { AvatarComponent, ButtonComponent, InputComponent, ModalComponent, SearchBarComponent } from '../shared/components/ui.components';

@Component({ selector: 'app-technician-management', imports: [AvatarComponent, ButtonComponent, InputComponent, ModalComponent, SearchBarComponent], templateUrl: './technician-management.component.html' })
export class TechnicianManagementComponent implements OnInit {
  private readonly service=inject(UserService);
  readonly search=signal(''); readonly availFilter=signal('All'); readonly selected=signal<User|null>(null); readonly technicians=signal<User[]>([]); readonly showAdd=signal(false); readonly error=signal(''); readonly saving=signal(false);
  name=''; email=''; phone=''; password=''; address='';
  ngOnInit():void{this.load();}
  load():void{this.service.getUsers().subscribe({next:u=>this.technicians.set(u.filter(x=>x.role==='technician'))});}
  filtered():User[]{const q=this.search().toLowerCase().trim();return this.technicians().filter(t=>!q||`${t.name} ${t.email}`.toLowerCase().includes(q));}
  openAdd():void{this.name='';this.email='';this.phone='';this.password='';this.address='';this.error.set('');this.showAdd.set(true);}
  add():void{this.error.set('');if(!this.name.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)||!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password)){this.error.set('Enter a valid name, email and password (8+ chars with uppercase, lowercase and number).');return;}this.saving.set(true);this.service.createTechnician({name:this.name.trim(),email:this.email.trim(),phone:this.phone.trim(),password:this.password,address:this.address.trim()}).subscribe({next:()=>{this.saving.set(false);this.showAdd.set(false);this.load();},error:e=>{this.saving.set(false);this.error.set(typeof e.error==='string'?e.error:'Could not create technician.');}});}
}
