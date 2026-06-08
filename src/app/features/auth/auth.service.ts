import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SignupRequestDto } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseApiUrl = environment.base_API_Url;
  private readonly http = inject(HttpClient);

  login(dto: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}auth/login`, dto);
  }

  verifyOtp(dto: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseApiUrl}auth/verify-otp`,
      dto
    );
  }

  signup(dto: SignupRequestDto): Observable<any> {
    return this.http.post<any>(
      `${this.baseApiUrl}auth/sign-up`,
      dto
    );
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    const expiry = this.getTokenExpiry(token);
    if (!expiry) return false;

    return Date.now() < expiry;
  }

  getTokenExpiry(token: string): number | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp ? payload.exp * 1000 : null;
    } catch {
      return null;
    }
  }
}
