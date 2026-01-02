import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-manager',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './manager.html',
  styleUrl: './manager.css',
})
export class Manager implements OnInit {
  private apiService=inject(ApiService);
  private router=inject(Router);
  private authService=inject(AuthService);

  depts=signal<string[]>([]);
  deptEmployees=signal<SimpleEmployeeModel[]>([]);
  selectedEmpId=signal<string|null>(null);
  minSalary=signal<number>(0);

  ngOnInit(){
    this.apiService.getAllDeptEmp().subscribe({
      next:(res)=>{
        this.deptEmployees.set(res.employees);
      }
    });

    this.apiService.getAllDept().subscribe({
      next: (res)=>{
        this.depts.set(res);
      }
    });

    this.apiService.getMinSalary().subscribe({
      next:(res)=>{
        this.minSalary.set(res);
      }
    });

  };

  onViewDetail(id: string){
    this.selectedEmpId.set(id);
    this.router.navigate(['emp',this.selectedEmpId()]);
  }

  onRegister(){
    this.router.navigate(['register',this.minSalary()]);
  }

  onLogout(){
    this.authService.logout();
  }
}
