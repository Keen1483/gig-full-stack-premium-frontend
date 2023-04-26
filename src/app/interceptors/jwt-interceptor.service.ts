import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (sessionStorage.getItem('access_token') && sessionStorage.getItem('refresh_token')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('access_token') ?? []
        }
      });
    }
    
    return next.handle(req);
  }
}
