import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, Footer, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  loginForm = this.fb.group({
    EmailOrMobile: ['', Validators.required],
    Password: ['', Validators.required],
  });
  loading = false;
  error = '';
  submitted: boolean = false;

  onClickLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    if (this.loading) return;
    this.loading = true;

    const payload: any = {
      EmailOrMobile: this.loginForm.value.EmailOrMobile!,
      Password: this.loginForm.value.Password!,
    };

    this.authService.login(payload).subscribe({
      next: (res) => {
        const data = res.Data;
        // this.toastrService.success(`${res.Message}`);
        localStorage.setItem('tempToken', data.TempToken);
        this.loading = false;
        this.router.navigate(['/auth/verify-otp'], {
          state: {
            TempToken: data.TempToken,
            OtpExpiresAt: data.OtpExpiresAt,
            // Purpose: data.Purpose,
          },
        });
      },
      error: (err) => {
        this.loading = false;
        // this.toastrService.error(`${err.message}`)
      },
    });
  }
}
