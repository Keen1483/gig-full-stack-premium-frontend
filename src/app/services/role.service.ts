import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { Subject } from 'rxjs';
import { HttpRequestsConfigService } from './http-requests-config.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles: Role[];
  roleSubject$ = new Subject<Role[]>();

  constructor(private httpRequestsConfig: HttpRequestsConfigService) {}

  emitRoleSubject() {
    this.roleSubject$.next(this.roles.slice());
  }

  getAllRoles() {
    return this.httpRequestsConfig.getAll<Role>('/roles').subscribe(
      (response: Role[]) => {
        this.roles = response;
        this.emitRoleSubject();
      }
    );
  }

  getRole(name: string) {
    return this.httpRequestsConfig.get<Role>('/roles', name);
  }

  createRole(role: Role) {
    return this.httpRequestsConfig.post<Role>('/roles/save', role);
  }

  editRole(id: number, role: Role) {
    return this.httpRequestsConfig.put<Role>('/roles/edit', id, role);
  }

  deleteRole(name: string|number) {
    return this.httpRequestsConfig.delete<Role>('/roles/delete', name);
  }
  
}
