import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manager',
  imports: [],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class Manager implements OnInit {
  deptEmployees=signal<SimpleEmployeeModel[]|null>(null);
  private apiService=inject(ApiService);

  ngOnInit(){
    console.log('display manager page');
    this.apiService.getAllDeptEmp().subscribe({
      next:(res)=>{
        console.log(res);
        this.deptEmployees.set(res);
      },
      error: ()=>console.log('erorr')
    })
  }
}
