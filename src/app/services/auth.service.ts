import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) { }

  authenticate(username: string, password: string) {
    const body = new HttpParams()
                          .set('username', username)
                          .set('password', password);
    const headers = new HttpHeaders()
                          .set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<any>(`${this.apiUrl}/login`, body.toString(), {headers}).pipe(
      map(response => {
        let access_token = response.access_token;
        let refresh_token = response.refresh_token;
        sessionStorage.setItem('access_token', 'Bearer ' + access_token);
        sessionStorage.setItem('refresh_token', 'Bearer ' + refresh_token);

        this.userService.getUser(username).subscribe(
          (response: User) => sessionStorage.setItem('principal', JSON.stringify(response)),
          error => console.error('Cannot fetch the principal')
        );
      }),
      //catchError(this.handleError('Login Failed', null))
    );
  }

  isAuthenticated() {
    let access_token = sessionStorage.getItem('access_token');
    let refresh_token = sessionStorage.getItem('refresh_token');
    let principal = sessionStorage.getItem('principal');
    return !(access_token === null || refresh_token === null || principal === null);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('principal');
    this.router.navigate(['/login']);
  }

  /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

        console.log(error); // log to console instead

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
  }
}
