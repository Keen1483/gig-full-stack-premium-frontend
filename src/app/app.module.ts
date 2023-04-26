import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { JwtInterceptorService } from './interceptors/jwt-interceptor.service';
import { ErrorInterceptorService } from './interceptors/error-interceptor.service';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { RoleCreateComponent } from './components/role/role-create/role-create.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { RoleEditComponent } from './components/role/role-edit/role-edit.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { ConfirmDeletionComponent } from './components/confirm-deletion/confirm-deletion.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CommentEditComponent } from './components/comment/comment-edit/comment-edit.component';
import { CommentDetailsComponent } from './components/comment/comment-details/comment-details.component';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { PublicPostListComponent } from './components/post/public-post-list/public-post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidenavComponent,
    FourOhFourComponent,
    LoginComponent,
    SignupComponent,
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent,
    RoleCreateComponent,
    RoleListComponent,
    RoleEditComponent,
    RoleDetailsComponent,
    ConfirmDeletionComponent,
    PostCreateComponent,
    PostEditComponent,
    PostDetailsComponent,
    PostListComponent,
    CommentCreateComponent,
    CommentEditComponent,
    CommentDetailsComponent,
    CommentListComponent,
    PublicPostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
