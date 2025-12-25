import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { EmpDetail } from '../emp-detail/emp-detail';
import { NewEmp } from '../new-emp/new-emp';

@Component({
  selector: 'app-manager',
  imports: [EmpDetail,NewEmp],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class Manager implements OnInit {
  depts=signal<string[]>([]);
  deptEmployees=signal<SimpleEmployeeModel[]>([]);
  private apiService=inject(ApiService);
  private router=inject(Router);
  selectedEmpId=signal<string|null>(null);

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
      next:(res)=>this.depts.set(res.depts),
      error:()=>this.router.navigate(['error/500'])
    })
  };

  onViewDetail(id: string){
    this.selectedEmpId.set(id);
    console.log(this.selectedEmpId());
    console.log('fetch detail');
  }

  //detailとnewでdeptの取得
}
