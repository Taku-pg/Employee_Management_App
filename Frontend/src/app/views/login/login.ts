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

  email='';
  password='';
  onLogin(){
    //サーバーからemailでデータ取得、パスワードがあっているか、合わないor　no dataでエラー
    console.log('login start');
    console.log(this.email);
    console.log(this.password);
    this.authService.login(this.email,this.password).subscribe(
      {
        next:(res)=>{
          //次にやること、データをempに渡して、遷移,interceptor
          sessionStorage.setItem('token', res.token);
          this.router.navigate(['/emp',res.emp.id]);
          console.log('success');
          console.log(res.emp.id);
        },
        error:()=>console.log('error')
      }
    );
  }
}
