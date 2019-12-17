import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatRadioModule, MatTabsModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatButtonModule, MatSortModule, MatTableModule, MatNativeDateModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';


import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { CurrencyMaskModule } from "ng2-currency-mask";
import ptBr from '@angular/common/locales/pt';

import { GlobalErrorHandlerService } from './user/global-error-handler.service';
// import { NgbdDatepickerPopup } from './apontamento/datepicker-popup';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './user/user.service';
import { AuthService } from './auth.service';
import { DialogProject } from './project/project-list/project-list.component';
import { ProjectService } from './project/project.service';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { ApptListTimeComponent, DialogApptTime } from './appointment/appt-list-time/appt-list-time.component';
import { ApptListExpenseComponent } from './appointment/appt-list-expense/appt-list-expense.component';

const modules = [
  MatToolbarModule,
  MatCheckboxModule,
  MatRippleModule, 
  MatDatepickerModule, 
  MatDialogModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatOptionModule, 
  MatSelectModule, 
  MatRadioModule, 
  MatTabsModule,
  MatProgressSpinnerModule, 
  MatMenuModule, 
  MatIconModule, 
  MatButtonModule, 
  MatSortModule, 
  MatTableModule,
  MatCardModule, 
  MatNativeDateModule,
  MatPaginatorModule,
  CurrencyMaskModule,
]

registerLocaleData(ptBr);

@NgModule({
  exports: [modules]
  ,
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    routingComponents,
    ApptListTimeComponent,
    ApptListExpenseComponent,
    DialogApptTime,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    modules,
  ],
  entryComponents:[
    DialogProject,
    DialogApptTime
  ],
  providers: [
    UserService,
    AuthService,
    ProjectService,
    GlobalErrorHandlerService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: LOCALE_ID, useValue: 'pt' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
