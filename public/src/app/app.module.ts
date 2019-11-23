import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID  } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatRippleModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatRadioModule, MatProgressSpinnerModule, MatMenuModule, MatIconModule, MatButtonModule, MatSortModule, MatTableModule, MatNativeDateModule } from '@angular/material';
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
  MatProgressSpinnerModule, 
  MatMenuModule, 
  MatIconModule, 
  MatButtonModule, 
  MatSortModule, 
  MatTableModule,
  MatCardModule, 
  MatNativeDateModule,
  MatPaginatorModule,
  CurrencyMaskModule
]

registerLocaleData(ptBr);

@NgModule({
  exports: [modules]
  ,
  declarations: [
    AppComponent,
    routingComponents,
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
    // DialogApontamentoHora
  ],
  providers: [
    UserService,
    AuthService,
    ProjectService,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    { provide: LOCALE_ID, useValue: 'pt' } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
