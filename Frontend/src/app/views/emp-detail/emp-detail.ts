import { Component, inject, input, OnInit, computed, signal, effect } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EmployeeModel } from '../../models/emp.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emp-detail',
  imports: [],
  templateUrl: './emp-detail.html',
  styleUrl: './emp-detail.css',
})
export class EmpDetail{
  private apiService=inject(ApiService);
  private router=inject(Router);
  empId=input.required<string>();
  depts=input.required<string[]>();
  emp=signal<EmployeeModel|null>(null);

  constructor(){
    effect(()=>{
      const id=this.empId();
      this.apiService.getEmpDetail(id).subscribe({
        next:(res)=>this.emp.set(res)
      })
    });
  }

  onUpdate(){

  }

  onDelete(){

  }

}
