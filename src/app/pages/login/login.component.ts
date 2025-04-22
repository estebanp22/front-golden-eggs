import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { LoginResponse } from '../../core/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  errorMessage = '';

  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    const loginData = this.loginForm.value;
    const credentials = {
      username: loginData.username ?? '',
      password: loginData.password ?? ''
    };

    this.auth.login(credentials).subscribe({
      next: (res: LoginResponse) => {
        console.log('Token recibido:', res.accessToken);
        this.auth.saveToken(res.accessToken);
        this.router.navigate(['/home']);
      },
      error: () => {
        this.errorMessage = 'Credenciales incorrectas.';
        this.loading = false;
      }
    });

  }

  get f() {
    return this.loginForm.controls;
  }
}
