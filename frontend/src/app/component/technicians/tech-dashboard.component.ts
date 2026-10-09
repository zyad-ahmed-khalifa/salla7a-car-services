import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmergencyService } from '../../service/emergency.service';
import { SessionService } from '../../service/session.service';
import type { Emergency } from '../../model/emergency.model';
import { AvatarComponent, BadgeComponent, ButtonComponent, StatCardComponent } from '../shared/components/ui.components';
@Component({selector:'app-tech-dashboard',imports:[AvatarComponent,BadgeComponent,ButtonComponent,StatCardComponent],templateUrl:'./tech-dashboard.component.html'})
export class TechDashboardComponent implements OnInit {
 private readonly router=inject(Router);private readonly emergency=inject(EmergencyService);private readonly session=inject(SessionService);
 readonly tech=this.session.user();readonly availability=signal('Available');readonly states=['Available','Busy','Offline'] as const;readonly myJobs=signal<Emergency[]>([]);readonly pending=signal<Emergency[]>([]);
 ngOnInit():void{this.load();}
 load():void{this.emergency.getTechnicianRequests().subscribe({next:r=>this.myJobs.set((r?.data??[]).map((x:any)=>this.emergency.toEmergency(x)))});this.emergency.getAvailableRequests().subscribe({next:r=>this.pending.set((r?.data??[]).map((x:any)=>this.emergency.toEmergency(x)))});}
 get active(){return this.myJobs().filter(e=>!['Completed','Cancelled'].includes(e.status));}
 get completed(){return this.myJobs().filter(e=>e.status==='Completed');}
  availClass(s:string):string{return this.availability()!==s?'text-muted hover:text-text':s==='Available'?'bg-success/10 text-success border-success/30 border':s==='Busy'?'bg-warning/10 text-warning border-warning/30 border':'bg-muted/10 text-muted border-muted/30 border';}
 go(path:string):void{void this.router.navigateByUrl(path);}
}
