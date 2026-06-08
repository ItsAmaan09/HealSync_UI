import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';
import { AuthService } from '../auth.service';
import { SignupRequestDto } from '../auth.model';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from '../../../shared/services/toastr.service';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [CommonModule, RouterModule, Footer, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  currentSignupRequest: SignupRequestDto = {
    Name: '',
    Email: '',
    Phone: '',
    Password: '',
    ConfirmPassword: '',
  };
  serverErrors: any = {};

  onClickSignup(form: NgForm) {
    if (!form.valid) {
      form.form.markAllAsTouched();
      return;
    }
    this.authService.signup(this.currentSignupRequest).subscribe({
      next: (data) => {
        this.toastrService.success(data.Message);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        if (err.status === 400 && err.error?.errors) {
          this.serverErrors = err.error.errors;
        }
      },
    });
  }
}
