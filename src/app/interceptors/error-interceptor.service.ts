import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(req).pipe(
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
            if (err instanceof HttpErrorResponse) {
              if ((err.status === 401 || err.status === 403) && sessionStorage.getItem('refresh_token')) {
                
                if (err.error && (err.error.error_message as string).startsWith('The Token has expired on')) {
                  
                  this.tokenService.refreshToken().subscribe(
                    response => {
                      console.info('Token was refreshed successfully: ' + response);
                      window.location.reload();
                    },
                    error => {
                      console.warn('Session has expired: ' + error);
                      this.authService.logout();
                    }
                  );
                }
              }
            }
            observer.error(err);
            observer.complete();
          })
      )
    );
  }
}
