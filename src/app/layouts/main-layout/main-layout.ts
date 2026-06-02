import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [CommonModule, RouterOutlet],
  template: `

        <router-outlet></router-outlet>

  `,
  styleUrl: './main-layout.scss',
})
export class MainLayout implements OnInit {

  ngOnInit(): void {

  }
}
