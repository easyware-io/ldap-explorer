// src/app/services/loading.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private requestCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  show() {
    this.requestCount++;
    if (this.requestCount > 0 && !this.isLoadingSubject.value) {
      this.isLoadingSubject.next(true);
    }
  }

  hide() {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0; // Prevent negative counts
      this.isLoadingSubject.next(false);
    }
  }
}
