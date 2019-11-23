import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserNewComponent } from './user/user-new/user-new.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserShowComponent } from './user/user-show/user-show.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ClientListComponent } from './client/client-list/client-list.component';
import { ClientShowComponent } from './client/client-show/client-show.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { ClientNewComponent } from './client/client-new/client-new.component';

import { ProjectListComponent, DialogProject } from './project/project-list/project-list.component';
import { ApptDashboardComponent } from './appointment/appt-dashboard/appt-dashboard.component';

import { GlobalErrorComponent } from './global-error/global-error.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectNewComponent } from './project/project-new/project-new.component';
import { ProjectEditComponent } from './project/project-edit/project-edit.component';

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
    path: 'project/new',
    component: ProjectNewComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'projet/edit/:id',
    component: ProjectEditComponent,
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
    path: 'clients',
    component: ClientListComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'client/new',
    component: ClientNewComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'client/edit/:id',
    component: ClientEditComponent,
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'client/show/:id',
    component: ClientShowComponent,
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
  ProjectNewComponent,
  ProjectEditComponent,
  ProjectListComponent,
  DialogProject,
  ApptDashboardComponent,
  ClientNewComponent,
  ClientListComponent,
  ClientEditComponent,
  ClientShowComponent,
  PageNotFoundComponent,
  GlobalErrorComponent,
]
