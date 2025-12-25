import { CommonModule } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-emp',
  imports: [FormsModule, CommonModule],
  templateUrl: './new-emp.html',
  styleUrl: './new-emp.css',
})
export class NewEmp {
  apiService=inject(ApiService);
  router=inject(Router);
  firstname='';
  lastname='';
  email='';
  salary=0;
  department='';
  depts=signal<string[]>([]);

  ngOnInit(){
    this.apiService.getAllDept().subscribe({
            next: (res)=>{
              this.depts.set(res);
              console.log(res);
            },
            error: ()=>this.router.navigate(['error/500'])
        });
    console.log(this.depts());
  }

  onRegister(){

  }
}
