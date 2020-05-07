import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DepartmentComponent } from './department/department.component';
import { DepartmentAddUpdateComponent } from './department/department-add-update.component';
import { MatDialogModule } from '@angular/material/dialog';
//Add employee component here same as department.

@NgModule({

  //All component should be decalred in declarations part.
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    DepartmentComponent,
    DepartmentAddUpdateComponent    
    //Add employee component here same as department.
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    //MatDialogActions,
    MatDialogModule,
    //Any new route will be added here.
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'department', component: DepartmentComponent },
      { path: 'department/add', component: DepartmentAddUpdateComponent },
      { path: 'department/update/:id', component: DepartmentAddUpdateComponent },

      //Add routes for employee here.
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
