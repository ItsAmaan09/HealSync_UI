import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
}
