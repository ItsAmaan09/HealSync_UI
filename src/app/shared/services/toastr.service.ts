import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private snackBar = inject(MatSnackBar);

  private show(msg: string, panelClass: string) {
    this.snackBar.open(msg, undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: [panelClass],
    });
  }

  error(msg: string) {
    this.show(msg, 'snackbar-error');
  }

  success(msg: string) {
    this.show(msg, 'snackbar-success');
  }

  warning(msg: string) {
    this.show(msg, 'snackbar-warning');
  }
}
