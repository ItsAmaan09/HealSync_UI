import { Routes } from '@angular/router';
import { Login } from './login/login';
import { VerifyOtp } from './verify-otp/verify-otp';
import { ForgetPassword } from './forget-password/forget-password';
import { ResetPassword } from './reset-password/reset-password';
import { Signup } from './signup/signup';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login,
    title: 'HealSync | Login'
  },
  {
    path: 'signup',
    component: Signup,
    title: 'HealSync | Sign Up'
  },
  {
    path: 'verify-otp',
    component: VerifyOtp,
    title: 'HealSync | Verify OTP',
  },
  {
    path: 'forget-password',
    component: ForgetPassword,
    title: 'HealSync | Forget Password',
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    title: 'HealSync | Reset Password',
  },
];
