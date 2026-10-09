import { Component, inject, OnInit, signal } from '@angular/core';
import type { User } from '../../model/user.model';
import { UserService } from '../../service/user.service';
import { AvatarComponent, BadgeComponent, ButtonComponent, ConfirmComponent, InputComponent, ModalComponent, SearchBarComponent, TabsComponent } from '../shared/components/ui.components';
@Component({ selector:'app-user-management', imports:[AvatarComponent,BadgeComponent,ButtonComponent,ConfirmComponent,InputComponent,ModalComponent,SearchBarComponent,TabsComponent], templateUrl:'./user-management.component.html' })
export class UserManagementComponent implements OnInit {
 private readonly service=inject(UserService); readonly tab=signal('Customers');readonly search=signal('');readonly statusFilter=signal('All');readonly selected=signal<User|null>(null);readonly confirm=signal<User|null>(null);readonly users=signal<User[]>([]);readonly showAdd=signal(false);readonly saving=signal(false);readonly error=signal('');
 name='';email='';phone='';password='';address='';
 ngOnInit():void{this.load();}
 load():void{this.service.getUsers().subscribe({next:u=>this.users.set(u),error:e=>this.error.set(typeof e.error==='string'?e.error:'Could not load users.')});}
 list():User[]{const role=this.tab()==='Customers'?'customer':this.tab()==='Technicians'?'technician':'admin';const q=this.search().toLowerCase().trim();return this.users().filter(u=>u.role===role&&(!q||`${u.name} ${u.email}`.toLowerCase().includes(q))&&(this.statusFilter()==='All'||u.status===this.statusFilter()));}
 toggle(u:User):void{this.service.updateUser(u.id,{status:u.status==='Active'?'Inactive':'Active'}).subscribe({next:updated=>this.users.update(list=>list.map(x=>x.id===u.id?updated:x)),error:e=>this.error.set(typeof e.error==='string'?e.error:'Could not update user.')});}
 askDelete(u:User):void{this.confirm.set(u);}
 deleteConfirmed():void{const u=this.confirm();if(!u)return;this.service.deleteUser(u.id).subscribe({next:()=>{this.confirm.set(null);this.users.update(list=>list.filter(x=>x.id!==u.id));},error:e=>this.error.set(typeof e.error==='string'?e.error:'Could not delete user.')});}
 openAdd():void{this.name='';this.email='';this.phone='';this.password='';this.address='';this.error.set('');this.showAdd.set(true);}
 addAdmin():void{this.error.set('');if(!this.name.trim()||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)||!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password)){this.error.set('Enter a valid name, email and password (8+ chars with uppercase, lowercase and number).');return;}this.saving.set(true);this.service.createAdmin({name:this.name.trim(),email:this.email.trim(),phone:this.phone.trim(),password:this.password,address:this.address.trim()}).subscribe({next:()=>{this.saving.set(false);this.showAdd.set(false);this.load();},error:e=>{this.saving.set(false);this.error.set(typeof e.error==='string'?e.error:'Could not create admin.');}});}
}
