import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn){
  const token = sessionStorage.getItem('token');

  if(token){
    const newReq=request.clone({
      headers: request.headers.set('Authorization',`Bearer ${token}`)
    })
    return next(newReq);
  }

  return next(request);
} 

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes)
  ]
};
