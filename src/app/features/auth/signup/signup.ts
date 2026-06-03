import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [RouterModule, Footer],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
}
