import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../../models/role.model';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdditionalMethodsService } from 'src/app/services/additional-methods.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  showSpinner: boolean = true;

  roles: Role[];
  roleSubscription$: Subscription;

  displayedColumns: string[] = ['position', 'name', 'createdAt', 'editedAt', 'edit', 'delete'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public additionalMethods: AdditionalMethodsService,
              private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getAllRoles();
    this.roleSubscription$ = this.roleService.roleSubject$.subscribe(
      (response: Role[]) => {
        this.roles = response;
        this.showSpinner = false;

        this.dataSource = new MatTableDataSource(this.roles);
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
      this.roleSubscription$.unsubscribe();
  }

}
