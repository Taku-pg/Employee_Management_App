import { Component, inject, OnInit, signal } from '@angular/core';
import { type EmployeeModel } from '../../models/emp.model';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  emp = signal<EmployeeModel | null>(null);
  role = signal<string | null>(null);
  isBothFieldEmpty = signal<boolean>(true);

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


  ngOnInit() {
    this.apiService.getMyInfo().subscribe({
      next: (e) => {
        this.emp.set(e);
      }
    });

    this.role.set(this.authService.getRole());

    this.passwordForm.valueChanges.subscribe(() => {
      const password = this.passwordForm.get('password')?.value;
      const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
      this.isBothFieldEmpty.set(!(password || confirmPassword));
    })
  }
  
  onChangePassword() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    const pass = this.password?.value;
    const confirmPass = this.confirmPassword?.value;

    if (!pass || !confirmPass) return;

    const passwords = { password: pass, confirmPassword: confirmPass };

    this.apiService.changePassword(passwords).subscribe({
      next: () => {
        this.passwordForm.reset();
      }
    })
  }

  onLogout() {
    this.authService.logout();
  }

}
