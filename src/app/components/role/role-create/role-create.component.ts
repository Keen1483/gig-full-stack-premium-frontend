import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RoleService } from 'src/app/services/role.service';
import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.scss']
})
export class RoleCreateComponent implements OnInit {

  roleForm: FormGroup;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private roleService: RoleService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.roleForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^((?!ROLE)(?!ROLE_)[A-Z0-9_])+$/),
          Validators.minLength(3)
        ]
      ]
    });
  }

  submitForm() {
    const formValue = this.roleForm.value;
    const role: Role = {
      name: formValue['name']
    };

    this.roleService.createRole(role).subscribe(
      (response: Role) => {
        this.additionalMethods.openSnackBar(`Role ${response.name} is successful created`, 'Close');
        this.router.navigate([`/roles/${response.name}`]);
      },
      error => {
        console.log('Cannot create role, an error occured: ' + error);
      }
    );
  }

}
