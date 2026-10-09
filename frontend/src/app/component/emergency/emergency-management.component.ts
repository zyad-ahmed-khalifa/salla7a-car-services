import { Component, inject, input, OnInit, signal } from '@angular/core';
import { EmergencyService } from '../../service/emergency.service';
import { UserService } from '../../service/user.service';
import type { Emergency } from '../../model/emergency.model';
import type { User } from '../../model/user.model';
import { BadgeComponent, ButtonComponent, SearchBarComponent, SelectComponent } from '../shared/components/ui.components';
@Component({ selector:'app-emergency-management', imports:[BadgeComponent,ButtonComponent,SearchBarComponent,SelectComponent], templateUrl:'./emergency-management.component.html' })
export class EmergencyManagementComponent implements OnInit {
 readonly id=input<string>(); private readonly service=inject(EmergencyService); private readonly users=inject(UserService);
 readonly search=signal('');readonly statusFilter=signal('All');readonly priorityFilter=signal('All');readonly selected=signal<Emergency|null>(null);readonly assignTech=signal('');readonly saving=signal(false);readonly saved=signal(false);readonly emergencies=signal<Emergency[]>([]);readonly techUsers=signal<User[]>([]);
 readonly techOptions=signal<{value:string;label:string}[]>([{value:'',label:'Unassigned'}]);
 ngOnInit():void{this.load();this.users.getUsers().subscribe({next:u=>{const t=u.filter(x=>x.role==='technician');this.techUsers.set(t);this.techOptions.set([{value:'',label:'Unassigned'},...t.map(x=>({value:x.id,label:x.name}))]);}});}
 load():void{this.service.getAllRequests().subscribe({next:r=>this.emergencies.set((r?.data??[]).map((x:any)=>this.service.toEmergency(x)))});}
 filtered():Emergency[]{const q=this.search().toLowerCase();return this.emergencies().filter(e=>(e.id.toLowerCase().includes(q)||e.customerName.toLowerCase().includes(q)||e.problemType.toLowerCase().includes(q))&&(this.statusFilter()==='All'||e.status===this.statusFilter())&&(this.priorityFilter()==='All'||e.priority===this.priorityFilter()));}
 current():Emergency|null{return this.selected()||this.emergencies().find(e=>e.id===this.id())||null;}
 assignedTech():User|undefined{return this.techUsers().find(t=>t.id===this.assignTech());}
 open(e:Emergency):void{this.selected.set(e);this.assignTech.set(e.technicianId||'');}
 assign():void{const e=this.current();if(!e)return;this.saving.set(true);this.service.editRequest(e.id,{technicianInfo:{technicianID:this.assignTech()||null,status:this.assignTech()?'busy':'available',assignedAt:this.assignTech()?new Date().toISOString():null}}).subscribe({next:()=>{this.saving.set(false);this.saved.set(true);this.load();setTimeout(()=>this.saved.set(false),2000);},error:()=>this.saving.set(false)});}
}
