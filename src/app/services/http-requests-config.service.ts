import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DatabaseObjects } from '../models/custom-types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsConfigService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAll<T extends DatabaseObjects>(url: string): Observable<T[]> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /');
    }
    return this.http.get<T[]>(this.apiUrl + url);
  }

  get<T extends DatabaseObjects>(url: string, param: string|number): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.get<T>(this.apiUrl + url + `/${param}`);
  }

  post<T extends DatabaseObjects>(url: string, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.post<T>(this.apiUrl + url, data);
  }

  put<T extends DatabaseObjects>(url: string, param: string|number, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.put<T>(this.apiUrl + url + `/${param}`, data);
  }

  delete<T extends DatabaseObjects>(url: string, param: string|number) {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.delete<any>(this.apiUrl + url + `/${param}`);
  }

  checkPassword<T extends DatabaseObjects>(url: string, param: string, data: T): Observable<T> {
    if (!this.isUrl(url)) {
      throw new Error(url + ': Wrong URL. The URL must start with /')
    }
    return this.http.post<T>(this.apiUrl + url + `/${param}`, data);
  }

  getComments<T extends DatabaseObjects, U extends DatabaseObjects>(url: string, data: T): Observable<U[]> {
    return this.http.post<U[]>(this.apiUrl + url, data);
  }

  private isUrl(url: string): boolean {
    return /^\/[a-zA-Z0-9._/-]*$/.test(url);
  }
  
}
