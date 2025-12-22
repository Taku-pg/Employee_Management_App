import { Component, inject } from '@angular/core';
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

  switchRole(role: string, empId: number){
    switch(role){
      case 'employee': {
        console.log('emp login');
        this.router.navigate(['/emp',empId]);
        break;
      }
      case 'manager':{
        this.router.navigate(['/manager']);
        break;
      } 
      case 'admin':{
        this.router.navigate(['/admin']);
        break;
      }
    }
  }

  email='';
  password='';
  onLogin(){
    //サーバーからemailでデータ取得、パスワードがあっているか、合わないor　no dataでエラー
    console.log(this.email);
    console.log(this.password);
    this.authService.login(this.email,this.password).subscribe(
      {
        next:(res)=>{
          //次にやること、データをempに渡して、遷移,interceptor
          //roleごとに違うurlへ
          sessionStorage.setItem('token', res.token);
          this.switchRole(res.emp.role,res.emp.id);
          //this.router.navigate(['/emp',res.emp.id]);
          console.log('success');
        },
        error:()=>console.log('error')
      }
    );
  }
}
