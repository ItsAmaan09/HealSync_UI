import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { AuthService } from '../auth.service';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  standalone: true,
  selector: 'app-verify-otp',
  imports: [CommonModule, RouterModule, Footer, FormsModule, ReactiveFormsModule],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  @ViewChildren('otpInput') otpInputs!: import('@angular/core').QueryList<
    import('@angular/core').ElementRef
  >;

  loading = false;
  otpForm = this.fb.group({
    Otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
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
        this.toastrService.success(res.Message);
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

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Auto-focus next input
    if (value && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    this.updateOtpFormValue();
  }

  onOtpKeydown(event: KeyboardEvent, index: number) {
    const input = event.target as HTMLInputElement;

    // Auto-focus previous input on backspace if current is empty
    if (event.key === 'Backspace' && !input.value && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedData = event.clipboardData?.getData('text');
    if (!pastedData) return;

    const otpCode = pastedData.replace(/\D/g, '').substring(0, 6);
    const inputs = this.otpInputs.toArray();

    for (let i = 0; i < otpCode.length; i++) {
      inputs[i].nativeElement.value = otpCode[i];
    }

    if (otpCode.length > 0) {
      const focusIndex = Math.min(otpCode.length, 5);
      inputs[focusIndex].nativeElement.focus();
    }

    this.updateOtpFormValue();
  }

  updateOtpFormValue() {
    const inputs = this.otpInputs.toArray();
    const otpValue = inputs.map((input) => input.nativeElement.value).join('');
    this.otpForm.patchValue({ Otp: otpValue });
  }
}
