import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginComponent } from './components/user/login/login.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailsComponent } from './components/user/user-details/user-details.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { RoleCreateComponent } from './components/role/role-create/role-create.component';
import { RoleDetailsComponent } from './components/role/role-details/role-details.component';
import { RoleEditComponent } from './components/role/role-edit/role-edit.component';
import { PostListComponent } from './components/post/post-list/post-list.component';
import { PublicPostListComponent } from './components/post/public-post-list/public-post-list.component';
import { PostCreateComponent } from './components/post/post-create/post-create.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'users', canActivate: [AuthGuard], component: UserListComponent},
  {path: 'users/:username', canActivate: [AuthGuard], component: UserDetailsComponent},
  {path: 'users/:username/edit', canActivate: [AuthGuard], component: UserEditComponent},
  {path: 'roles', canActivate: [AuthGuard], component: RoleListComponent},
  {path: 'roles/create', canActivate: [AuthGuard], component: RoleCreateComponent},
  {path: 'roles/:name', canActivate: [AuthGuard], component: RoleDetailsComponent},
  {path: 'roles/:name/edit', canActivate: [AuthGuard], component: RoleEditComponent},
  {path: 'posts', canActivate: [AuthGuard], component: PostListComponent},
  {path: 'posts-public', component: PublicPostListComponent},
  {path: 'posts/create', canActivate: [AuthGuard], component: PostCreateComponent},
  {path: 'posts/:title', canActivate: [AuthGuard], component: PostDetailsComponent},
  {path: 'posts/:title/edit', canActivate: [AuthGuard], component: PostEditComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: FourOhFourComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
