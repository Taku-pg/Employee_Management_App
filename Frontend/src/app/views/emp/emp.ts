import { Component, inject, input, OnInit, signal } from '@angular/core';
import { type EmployeeModel } from '../../models/emp.model';
import { env } from '../../../environment/env';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { map } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordMismatchValidator } from '../../services/validators/passwordValidator';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-emp',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './emp.html',
  styleUrl: './emp.css',
})
export class Emp implements OnInit {
  private apiService = inject(ApiService);
  private authService=inject(AuthService);
  private fb = inject(FormBuilder);
  
  emp = signal<EmployeeModel | undefined>(undefined);
  role=signal<string|null>(null);

  ngOnInit() {
    console.log('emp page');
    this.apiService.getMyInfo().subscribe({
      next: (e) => {
        console.log(e);
        this.emp.set(e);
      }
    }
    );
    this.role.set(this.authService.getRole());
  }

  passwordForm = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
  }, { validators: PasswordMismatchValidator });

  get password() {
    return this.passwordForm.get('password');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  onChangePassword() {
    if(this.passwordForm.invalid){
      this.passwordForm.markAllAsTouched();
      return;
    }

    const pass=this.password?.value;
    const confirmPass=this.confirmPassword?.value;

    if(!pass || !confirmPass)return;

    const passwords={password: pass,confirmPassword: confirmPass};

    this.apiService.changePassword(passwords).subscribe({
      next:()=>this.ngOnInit(),
    })
  }

  onLogout(){
    this.authService.logout();
  }

}
