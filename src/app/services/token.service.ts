import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private http: HttpClient;
  apiUrl = environment.apiUrl;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  refreshToken() {
    const headers = new HttpHeaders()
              .delete('Authorization', sessionStorage.getItem('access_token') ?? [])
              .set('Authorization', sessionStorage.getItem('refresh_token') ?? []);
    
    return this.http.get<any>(`${this.apiUrl}/users/token/refresh`, {headers}).pipe(
      map(response => {
        let access_token = response.access_token;
        let refresh_token = response.refresh_token;
        sessionStorage.setItem('access_token', `Bearer ${access_token}`);
        sessionStorage.setItem('refresh_token', `Bearer ${refresh_token}`);
      })
    );
  }

}
