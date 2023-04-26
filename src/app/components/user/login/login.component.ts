import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  redirectURL: string;
  loginForm: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private additionalMethods: AdditionalMethodsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  submitForm() {
    const formValue = this.loginForm.value;
    const username = formValue['username'];
    const password = formValue['password'];
    
    this.authService.authenticate(username, password).subscribe(
      response => {
        let params = this.route.snapshot.queryParams;
        if (params['redirectURL']) {
          this.redirectURL = params['redirectURL'];
        }
        
        if (this.redirectURL) {
          console.log(this.redirectURL);
          this.router.navigateByUrl(this.redirectURL)
                          .catch(() => this.router.navigate(['']));
        } else {
          this.router.navigate(['']);
        }
        this.additionalMethods.openSnackBar(`The user ${username} was successfully connected`, 'Close');
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = this.additionalMethods.loginFailed(error);
      }
    );
  }

}
