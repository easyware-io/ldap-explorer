import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '@services/loading.service';
import { Observable, finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loadingService = inject(LoadingService);

  // Skip loading for specific requests (optional)
  if (request.headers.has('X-Skip-Loader')) {
    return next(request);
  }

  loadingService.show();
  return next(request).pipe(finalize(() => loadingService.hide()));
};
