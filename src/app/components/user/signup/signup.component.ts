import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Input() confirmPassword: string;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,
              private additionalMethods: AdditionalMethodsService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.minLength(3)]],
      username: ['', [Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.userForm.value;
    const user: User = {
      email: formValue['email'],
      password: formValue['password']
    };
    if (formValue['name']) user.name = formValue['name'];
    if (formValue['username']) user.username = formValue['username'];

    this.userService.createUser(user).subscribe(
      (response: User) => {
        this.additionalMethods.openSnackBar(`User ${response.username} is successful created`, 'Close');
        this.router.navigate([`/users/${response.username}`]);
      },
      error => {
        console.log('Cannot create user, an error occured: ' + error);
      }
    );
  }

}
