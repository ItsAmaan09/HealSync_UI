import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../../shared/services/toastr.service';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  ngOnInit(): void {
  }

  onLogout() {
    localStorage.clear();
    this.toastrService.success('Logout Successfully');
    this.router.navigate(['/auth/login']);
  }
}
