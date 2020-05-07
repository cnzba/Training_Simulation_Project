import { Component } from '@angular/core';
import { IDepartment } from './department-model';
import { DepartmentService } from './department.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-department-component',
  templateUrl: './department.component.html'
})
export class DepartmentComponent {
  model: any = {};
  departmentList: IDepartment[]; //To use this department we need to import it as above in import section.
  loading: boolean = true;
  dialogConfig: MatDialogConfig;
  deleteId: number = 0;
  deleteDoalogRef: any;

  @ViewChild('messageDialog') messageDialog: TemplateRef<any>;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;

  //Whatever services we need to use we have to inject them in constructor. 
  constructor(private departmentService: DepartmentService,
     private dialog: MatDialog
  ) {

    this.dialogConfig = new MatDialogConfig();
    // this.dialogConfig. = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = "400px";

    //Call service method to get list from database.
    departmentService.getDepartments().subscribe(
      (data: IDepartment[]) => {
        this.departmentList = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
      });

    this.model.title = "Message";
  }

  deleteDepartment(id: number) {

    this.deleteDoalogRef = this.dialog.open(this.confirmDialog, this.dialogConfig);
    this.deleteId = id;
    //dialogref.close();
  }
  yesClick() {
    this.loading = true;
    this.departmentService.deleteDepartment(this.deleteId).subscribe(
      (data: string) => {
        this.model.content = data;
        this.dialog.open(this.messageDialog, this.dialogConfig);
        this.loading = false;
        window.location.reload()
      },
      error => {
        this.model.title = "Error";
        this.model.content = error.globalError;
        this.dialog.open(this.messageDialog, this.dialogConfig);
        this.loading = false;
      });
    this.deleteId = 0;
    this.deleteDoalogRef.close();
  }

}

