import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  standalone: true,
  selector: 'app-verify-otp',
  imports: [CommonModule, RouterModule, Footer],
  templateUrl: './verify-otp.html',
  styleUrl: './verify-otp.scss',
})
export class VerifyOtp  {

}
