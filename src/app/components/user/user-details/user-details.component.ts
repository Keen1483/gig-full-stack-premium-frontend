import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  user: User;

  constructor(public additionalMethods: AdditionalMethodsService,
              private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const username = this.route.snapshot.params['username'];
    this.userService.getUser(username).subscribe(
      (response: User) => {
        this.user = response;
      },
      error => {
        console.log(`Cannot get user ${username}`);
      }
    );
  }

}
