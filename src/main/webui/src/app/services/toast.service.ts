import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly snackBar = inject(MatSnackBar);

  public show(message: string, action: string = '', config: MatSnackBarConfig = { duration: 3000 }): void {
    this.snackBar.open(message, action, config);
  }
}
