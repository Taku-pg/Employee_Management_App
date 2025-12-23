import { Component, inject, input, OnInit, signal } from '@angular/core';
import { type EmployeeModel } from '../../models/emp.model';
import { env } from '../../../environment/env';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-emp',
  imports: [],
  templateUrl: './emp.html',
  styleUrl: './emp.css',
})
export class Emp implements OnInit {
  //親コンポーネントで設定inputを
  //httpの設定
  //backでcors設定、環境変数(env{baseurl: 'http://localhost:3000/api'}をexport)設定
  emp=signal<EmployeeModel|undefined>(undefined);
  private router=inject(Router);
  private apiService=inject(ApiService);

  ngOnInit(){
    console.log('emp page');
    this.apiService.getMyInfo().subscribe({
      next:(e)=>{
        console.log(e);
        this.emp.set(e);
      },
      error:()=>this.router.navigate(['error/500'])
    }
    );
    
  }
}
