import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { UserService } from 'src/app/services/user.service';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  allRoles: Role[];

  rolesControl: FormControl;

  resetPassword: boolean = false;
  @Input() oldPassword: string = '';
  @Input() confirmPassword: string;
  editUserForm: FormGroup;

  errorMessage: String;
  errorPassword: string;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private roleService: RoleService) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.userService.getUser(username).subscribe(
      (response: User) => {
        // Get the current user
        this.user = response;
        this.initForm(this.user);

        // Set user's roles selected default in form
        const roleNames: string[] = [];
        if (this.user.roles) {
          for (let role of this.user.roles) {
            roleNames.push(role.name)
          }
        }
        this.rolesControl = new FormControl(roleNames);
      },
      error => {
        console.log(`Cannot get user ${username}`);
      }
    );
      
    // Get all roles from database
    this.roleService.getAllRoles();
    this.roleService.roleSubject$.subscribe(
      (roles: Role[]) => {
        this.allRoles = roles;
      }
    );
  }

  initForm(user: User) {
    this.editUserForm = this.fb.group({
      email: [user.email, [Validators.required, Validators.email]],
      name: [user.name, [Validators.minLength(3)]],
      username: [user.username, [Validators.minLength(3)]],
      password: ['', [Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.editUserForm.value;
    const user: User = {
      email: formValue['email']
    };
    if (formValue['name']) user.name = formValue['name'];
    if (formValue['username']) user.username = formValue['username'];
    if (formValue['password']) user.password = formValue['password'];

    // GET SELECTED ROLES
    const roles: Role[] = this.getSelectedRoles()
    if (roles.length !== 0) user.roles = roles;

    if ((user.email !== this.user.email || user.name !== this.user.name || user.username !== this.user.username) ||
    user.password ||
    (roles.length !== 0 && !this.compareRolesArray(roles, this.user.roles ?? []))) {

      if (user.password) {
        this.userService.checkPassword(this.oldPassword, this.user).subscribe(
          response => {
            this.userService.editUser(this.user.id ?? -1, user).subscribe(
              (response: User) => {
                this.additionalMethods.openSnackBar(`User ${response.username} is successful updated`, 'Close');
                this.router.navigate([`/users/${response.username}`]);
              },
              error => {
                console.log('An error occured, cannot edite user');
              }
            );
          },
          error => {
            console.log('Wrong password')
            this.errorPassword = 'Wrong password, verify and try again';
          }
        );
      } else {
        this.userService.editUser(this.user.id ?? -1, user).subscribe(
          (response: User) => {
            this.additionalMethods.openSnackBar(`User ${response.username} is successful updated`, 'Close');
            this.router.navigate([`/users/${response.username}`]);
          },
          error => {
            console.log('An error occured, cannot edite user');
          }
        );
      }
    } else {
      this.errorMessage = 'No change maked';
    }
  }

  getSelectedRoles(): Role[] {
    const roleNames: string[] = this.rolesControl.value;
    const roles: Role[] = [];
    for (let value of roleNames) {
      const role: Role = { name: value };
      roles.push(role);
    }
    return roles;
  }

  compareRolesArray(rolesA: Role[], rolesB: Role[]): boolean {
    if (rolesA.length !== rolesB.length) return false;

    for (let i = 0; i < rolesA.length; i++) {
      if (rolesA[i].name !== rolesB[i].name) return false;
    }

    return true;
  }

}
