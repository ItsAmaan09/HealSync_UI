import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../sidebar/sidebar/sidebar';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, Sidebar],
  template: `
    <div class="d-flex">
      <app-sidebar></app-sidebar>
      <div class="flex-grow-1 with-sidebar" [class.sidebar-collapsed]="isSidebarCollapsed">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  isSidebarCollapsed = false;
  private readonly sidebarService = inject(SidebarService);

  ngOnInit(): void {
    this.sidebarService.collapsed$.subscribe((collapsed) => {
      this.isSidebarCollapsed = collapsed;
    });
  }
}
