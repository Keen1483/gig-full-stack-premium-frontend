import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit {

  role: Role;

  editRoleForm: FormGroup;

  errorMessage: String;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private roleService: RoleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const name = this.route.snapshot.params['name'];
    this.roleService.getRole(name).subscribe(
      (response: Role) => {
        this.role = response;
        this.initForm(this.role);
      },
      error => {
        console.log(`Cannot get role ${name}`);
      }
    );
  }

  initForm(role: Role) {
    this.editRoleForm = this.fb.group({
      name: [
        role.name.replace('ROLE_', ''),
        [
          Validators.required,
          Validators.pattern(/^((?!ROLE)(?!ROLE_)[A-Z0-9_])+$/),
          Validators.minLength(3)
        ]
      ]
    });
  }

  submitForm() {
    const formValue = this.editRoleForm.value;
    const role: Role = {
      name: formValue['name']
    };

    if (`ROLE_${role.name}` !== this.role.name) {
      this.roleService.editRole(this.role.id ?? -1, role).subscribe(
        (response: Role) => {
          this.additionalMethods.openSnackBar(`Role ${response.name} is successful updated`, 'Close');
          this.router.navigate([`/roles/${response.name}`]);
        },
        error => {
          console.log('An error occured, cannot edite role');
        }
      );
    } else {
      this.errorMessage = 'No change maked';
    }
  }

}
