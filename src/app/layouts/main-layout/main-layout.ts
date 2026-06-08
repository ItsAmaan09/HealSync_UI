import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet, Sidebar],
  template: `
    <app-sidebar></app-sidebar>
    <router-outlet></router-outlet>
  `,
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {
  ngOnInit(): void {}
}
