import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {

  role: Role;

  constructor(public additionalMethods: AdditionalMethodsService,
              private roleService: RoleService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];
    this.roleService.getRole(name).subscribe(
      (response: Role) => {
        this.role = response;
      },
      error => {
        console.log(`Cannot get role ${name}`);
      }
    );
  }

}
