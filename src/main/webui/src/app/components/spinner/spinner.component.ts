// src/app/components/spinner/spinner.component.ts
import { Component, inject } from '@angular/core';
import { MaterialModule } from '@modules/material.module';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'spinner',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './spinner.component.html',
  styles: [
    `
      .spinner-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: white;
      }
      mat-spinner {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class SpinnerComponent {
  private readonly loadingService = inject(LoadingService);

  isLoading$ = this.loadingService.isLoading$;
}
