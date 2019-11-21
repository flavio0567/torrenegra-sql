import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserShowComponent } from './user/user-show/user-show.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { ProjectListComponent } from './project/project-list/project-list.component';
import { ApptDashboardComponent } from './appointment/appt-dashboard/appt-dashboard.component';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'user/new',
    component: UserNewComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UserListComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'user/show/:id',
    component: UserShowComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'user/edit/:id',
    component: UserEditComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'first/access',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    component: ApptDashboardComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: GlobalErrorComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [
  LoginComponent,
  UserNewComponent,
  UserListComponent,
  UserShowComponent,
  UserEditComponent,
  RegisterComponent,
  ProjectListComponent,
  ApptDashboardComponent,
  PageNotFoundComponent,
  GlobalErrorComponent,
]
