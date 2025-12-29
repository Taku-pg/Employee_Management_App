import { Component, inject, OnInit, signal } from '@angular/core';
import { SimpleEmployeeModel } from '../../models/simpleEmp.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit{
  allEmployees=signal<SimpleEmployeeModel[]>([]);
  private apiService=inject(ApiService);
  private authService=inject(AuthService);

  ngOnInit(){
    this.apiService.getAllEmp().subscribe({
      next:(res)=>{
        console.log(res);
        this.allEmployees.set(res.employees);
      },
      error: ()=>console.log('error')
    })
  }

  onLogout(){
    this.authService.logout();
  }
}
