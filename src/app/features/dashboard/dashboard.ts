import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly router = inject(Router);
  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
