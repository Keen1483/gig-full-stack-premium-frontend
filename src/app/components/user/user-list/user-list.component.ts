import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  showSpinner: boolean = true;

  users: User[];
  userSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'email', 'name', 'username', 'roles', 'createdAt', 'editedAt', 'edit', 'delete'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public additionalMethods: AdditionalMethodsService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers();
    this.userSubscription$ = this.userService.userSubject$.subscribe(
      (response: User[]) => {
        this.users = response;
        this.showSpinner = false;

        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('An error occured');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
      this.userSubscription$.unsubscribe();
  }

}
