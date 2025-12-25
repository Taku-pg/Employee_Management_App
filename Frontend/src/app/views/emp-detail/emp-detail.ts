import { Component, inject, input, OnInit, computed, signal, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeModel } from '../../models/emp.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-detail',
  imports: [CommonModule],
  templateUrl: './emp-detail.html',
  styleUrl: './emp-detail.css',
})
export class EmpDetail implements OnInit{
  private apiService=inject(ApiService);
  private router=inject(Router);
  private activatedRoute=inject(ActivatedRoute);
  empId=input.required<string>();
  //empId: string|null=null;
  depts=signal<string[]>([]);
  emp=signal<EmployeeModel|null>(null);

  constructor(){
    effect(()=>{
      const id=this.empId();
      this.apiService.getEmpDetail(id).subscribe({
        next:(res)=>this.emp.set(res)
      });
    });
  }

  ngOnInit(){

    /*this.activatedRoute.paramMap.subscribe(params=>{
      this.empId=params.get('id');
    });

    this.apiService.getEmpDetail(this.empId!).subscribe({
        next:(res)=>this.emp.set(res)
    });*/

    this.apiService.getAllDept().subscribe({
            next: (res)=>{
              this.depts.set(res);
              console.log(res);
            },
            error: ()=>this.router.navigate(['error/500'])
        });
    console.log(this.depts());
  }

  onUpdate(){
    //update entire employee
  }

  onDelete(){
    //delete entire employee
  }

  onDeleteNationality(){
    //delete this nationality
  }



}
