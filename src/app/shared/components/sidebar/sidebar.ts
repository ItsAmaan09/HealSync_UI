import { Component } from '@angular/core';
import { DOCTOR_MENU, PATIENT_MENU } from './menu.config';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  menus: any[] = [];

  ngOnInit() {
    debugger
    const role = localStorage.getItem('role')!;

    if (role === 'Patient') {
      this.menus = PATIENT_MENU;
    }

    if (role === 'Doctor') {
      this.menus = DOCTOR_MENU;
    }
  }
}
