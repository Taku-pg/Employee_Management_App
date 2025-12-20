import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Emp } from './views/emp/emp';
import { Login } from './views/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Emp, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  protected readonly title = signal('Frontend');
  private apiService=inject(ApiService);
  //loggedin=signal(false);
  ngOnInit(){
    console.log('hello from front')
    this.apiService.getHello('/hello').subscribe({
      next: (res)=>console.log(res),
      error: ()=>console.log('error')
    });
  }
  //control login and role

}
