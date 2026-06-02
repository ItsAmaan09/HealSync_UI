import { Routes } from '@angular/router';
import { Login } from './login/login';
import { VerifyOtp } from './verify-otp/verify-otp';
import { ForgetPassword } from './forget-password/forget-password';
import { ResetPassword } from './reset-password/reset-password';

export const AUTH_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login, title: 'Business Portal | Login' },
  {
    path: 'verify-otp',
    component: VerifyOtp,
    title: 'Business Portal | Verify OTP',
  },
  {
    path: 'forget-password',
    component: ForgetPassword,
    title: 'Business Portal | Forget Password',
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    title: 'Business Portal | Reset Password',
  },
];
