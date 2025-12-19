import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  onLogin(){
    //サーバーからemailでデータ取得、パスワードがあっているか、合わないor　no dataでエラー
  }
}
