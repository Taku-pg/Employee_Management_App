import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core'
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { catchError } from 'rxjs';



function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const token = sessionStorage.getItem('token');

  if (token) {
    const newReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    })
    return next(newReq);
  }

  return next(request);
}

function errorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);

  return next(request).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['error/401']);
      } else if (err.status === 403) {
        router.navigate(['error/403']);
      } else if (err.status === 500) {
        router.navigate(['error/500']);
      }

      throw err;
    })
  )
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      })
    })
  ]
};