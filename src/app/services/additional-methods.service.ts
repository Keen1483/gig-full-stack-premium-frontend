import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { RoleService } from './role.service';
import { ConfirmDeletionComponent } from '../components/confirm-deletion/confirm-deletion.component';
import { DatabaseObjectsName, DatabaseObjects } from '../models/custom-types';
import { PostService } from './post.service';
import { CommentService } from './comment.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionalMethodsService {

  dialogRef: MatDialogRef<ConfirmDeletionComponent>;

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private roleService: RoleService,
              private postService: PostService,
              private commentService: CommentService,
              private router: Router) { }

  // Confirm the deleting data
  openDeletionConfirm(data: string|number, className: DatabaseObjectsName) {
    this.dialogRef = this.dialog.open(ConfirmDeletionComponent, {
      data: {data: data},
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmationMessage = `Are you sure you want to delete the ${className}`;

    this.dialogRef.afterClosed().subscribe(response => {
      if (response) {
        if (className === 'User') {
          this.userService.deleteUser(data).subscribe(
            response => {
              this.userService.getAllUsers();
              this.userService.emitUserSubject();
              this.openSnackBar(`The user ${data} was successfully deleted`, 'Close');
              this.router.navigate(['users']);
            }
          );
        } else if (className === 'Role') {
          this.roleService.deleteRole(data).subscribe(
            response => {
              this.roleService.getAllRoles();
              this.roleService.emitRoleSubject();
              this.openSnackBar(`The role ${data} was successfully deleted`, 'Close');
              this.router.navigate(['roles']);
            }
          );
        } else if (className === 'Post') {
          this.postService.deletePost(data).subscribe(
            response => {
              this.postService.getAllPosts();
              this.postService.emitPostSubject();
              this.openSnackBar(`The post ${data} was successfully deleted`, 'Close');
              this.router.navigate(['posts']);
            }
          );
        } else if (className === 'Comment') {
          this.commentService.deleteComment(data).subscribe(
            response => {
              this.commentService.getAllComments();
              this.commentService.emitCommentSubject();
              this.openSnackBar(`The comment ${data} was successfully deleted`, 'Close');
              this.router.navigate(['posts']);
            }
          );
        }
      }
      this.dialogRef = {} as MatDialogRef<ConfirmDeletionComponent>;
    });
  }

  // Notify the user after sending data to server
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {duration: 5000});
  }

  // Notify if its login failed
  loginFailed(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return 'User not found, check your username and password';
    } else if (error.status === 0) {
      return 'Check your connection and try again';
    } else if(error.status === 403) {
      return 'Access denied, please contact the administrator';
    } else {
      return 'Check your username and password or check your connection and try again';
    }
  }

  // Help to sort an array of objects
  compareDatabaseObject<T extends DatabaseObjects>(a: T, b: T): number {
    if ((a.id ?? -1) < (b.id ?? -1)) {
      return 1;
    } else if ((a.id ?? -1) > (b.id ?? -1)) {
      return -1;
    } else {
      return 0;
    }
  }

}
