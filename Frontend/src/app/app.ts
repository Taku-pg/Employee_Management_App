import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { Emp } from './views/emp/emp';
import { Login } from './views/login/login';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Frontend');
  //private apiService=inject(ApiService);
  //loggedin=signal(false);
  //control login and role
}
