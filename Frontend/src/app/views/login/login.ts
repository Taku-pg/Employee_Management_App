import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService=inject(AuthService);
  private router=inject(Router);

  switchRole(role: string){
    switch(role){
      case 'employee': 
        console.log('emp login');
        this.router.navigate(['/emp']);
        break;
      
      case 'manager':
        this.router.navigate(['/manager']);
        break;
      
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      
    }
  }

  email='';
  password='';
  errorMessage=signal<string>('');
  
  onLogin(){
    console.log(this.email);
    console.log(this.password);
    this.authService.login(this.email,this.password).subscribe(
      {
        next:(res)=>{
          sessionStorage.setItem('token', res.token);
          this.switchRole(res.emp.role);
        },
        error:(err)=>{
          if(err.status===400 && err.error?.message){
            this.errorMessage.set(err.error?.message);
          }
        }

      }
    );
  }
}
