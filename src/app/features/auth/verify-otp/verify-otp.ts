import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  selector: 'app-verify-otp',
  imports: [CommonModule, RouterModule, Footer, FormsModule, ReactiveFormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  loading = false;
  otpForm = this.fb.group({
    Otp: ['', Validators.required],
  });
  tempToken!: string;
  otpExpiresAt!: string;
  // purpose!: number;
  submitted: boolean = false;

  ngOnInit() {
    const navState = history.state;
    const hasTempToken = navState?.TempToken;

    if (!hasTempToken) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.tempToken = navState.TempToken;
    this.otpExpiresAt = navState.OtpExpiresAt;
    // this.purpose = navState.Purpose;
  }

  onClickConfirm() {
    this.submitted = true;
    if (this.otpForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    const tempToken = localStorage.getItem('tempToken');
    if (!tempToken) {
      this.loading = false;
      return;
    }

    const payload: any = {
      TempToken: tempToken,
      Otp: this.otpForm.value.Otp!,
    };
    this.authService.verifyOtp(payload).subscribe({
      next: (res) => {
        // if (this.isLoginFlow()) {
        localStorage.setItem('accessToken', res.Data.AccessToken);
        localStorage.setItem('userId', res.Data.UserId.toString());
        localStorage.setItem('fullName', res.Data.FullName);
        // localStorage.setItem('CompanyId', res.Data.CompanyId.toString());
        localStorage.removeItem('tempToken');
        // this.toastrService.success(`${res.Message}`);
        this.router.navigate(['/dashboard']);
        // } 
        // else {
        //   this.router.navigate(['/auth/reset-password'], {
        //     state: {
        //       TempToken: this.tempToken,
        //       OtpExpiresAt: this.otpExpiresAt,
        //       // Purpose: this.purpose,
        //     },
        //   });
        //   // this.toastrService.success(`${res.Message}`);
        // }
      },
      error: (err) => {
        // this.error = err.message;
        // this.toastrService.error(`${err.message}`);
        this.loading = false;
      },
    });
  }
}
