import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];
  userSubject$ = new Subject<User[]>();

  constructor(private httpRequestsConfig: HttpRequestsConfigService) {}

  emitUserSubject() {
    this.userSubject$.next(this.users.slice());
  }

  getAllUsers() {
    return this.httpRequestsConfig.getAll<User>('/users').subscribe(
      (response: User[]) => {
        this.users = response;
        this.emitUserSubject();
      }
    );
  }

  getUser(username: string) {
    return this.httpRequestsConfig.get<User>('/users', username);
  }

  createUser(user: User) {
    return this.httpRequestsConfig.post<User>('/users/save', user);
  }

  editUser(id: number, user: User) {
    return this.httpRequestsConfig.put<User>('/users/edit', id, user);
  }

  deleteUser(username: string|number) {
    return this.httpRequestsConfig.delete<User>('/users/delete', username);
  }

  checkPassword(password: string, user: User) {
    return this.httpRequestsConfig.checkPassword<User>('/users/check-password', password, user);
  }
  
}
