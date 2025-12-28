import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';
import { Router, RouterOutlet } from '@angular/router';
import { EmpDetail } from '../emp-detail/emp-detail';
import { NewEmp } from '../new-emp/new-emp';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-manager',
  imports: [EmpDetail,NewEmp,RouterOutlet],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class Manager implements OnInit {
  depts=signal<string[]>([]);
  deptEmployees=signal<SimpleEmployeeModel[]>([]);
  private apiService=inject(ApiService);
  private router=inject(Router);
  selectedEmpId=signal<string|null>(null);
  minSalary=signal<number>(0);

  ngOnInit(){
    console.log('display manager page');
    this.apiService.getAllDeptEmp().subscribe({
      next:(res)=>{
        console.log(res);
        this.deptEmployees.set(res.employees);
      },
      error: ()=>this.router.navigate(['error/500'])
    });

    this.apiService.getAllDept().subscribe({
            next: (res)=>{
              this.depts.set(res);
              console.log(res);
            },
            error: ()=>this.router.navigate(['error/500'])
    });

    this.apiService.getMinSalary().subscribe({
      next:(res)=>{
        this.minSalary.set(res);
        /*const salaryControl=this.newEmpForm.get('salary');
        salaryControl?.setValidators([Validators.required,Validators.min(res)]);
        salaryControl?.updateValueAndValidity();*/
        console.log(res);
        console.log(this.minSalary);
      },
      error:()=>this.router.navigate(['error/500'])
    });

  };

  onViewDetail(id: string){
    //this.router.navigate([`manager/emp/${id}`]);
    this.selectedEmpId.set(id);
    console.log(this.selectedEmpId());
    console.log('fetch detail');
    this.router.navigate(['emp',this.selectedEmpId()]);
  }

  onRegister(){
    this.router.navigate(['register',this.minSalary()]);
  }

  //detailとnewでdeptの取得
}
