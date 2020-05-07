import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Department } from './department-model';
import { DepartmentService } from './department.service';
import { ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import { ViewChild, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';  //To open dialog box

@Component({
  selector: 'app-department-add-update',
  templateUrl: './department-add-update.component.html'
  // styleUrls: ['./department-create.component.css']
})
export class DepartmentAddUpdateComponent implements OnInit {
  form: FormGroup;
  id: number = 0;
  department: Department;
  header: string;
  message: string;
  model: any = {};
  dialogConfig: MatDialogConfig;

  @ViewChild('messageDialog') messageDialog: TemplateRef<any>;

  //Services which are supposed to be used must be injected to the constructor.
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder, private departmentService: DepartmentService,
    private dialog: MatDialog) {
    this.department = new Department();

    this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.hasBackdrop = false;
    this.dialogConfig.width = "400px";
  }

  ngOnInit() {

    this.form = this.formBuilder.group({

      name: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])],

      description: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(200)
      ])],

    });
    this.model.title = "Message";

    //Retrieve params from URL
    this.id = this.route.snapshot.params.id;

    if (!isNullOrUndefined(this.id)) {
      this.header = "Update department";
      this.getDataById();
    } else {
      this.header = "Create new department";
    }
  }

  //Submit method
  OnSubmit({ value, valid }, ev: Event) {

    ev.preventDefault();
    this.department.description = value.description;
    this.department.name = value.name;

    if (!isNullOrUndefined(this.id)) {

      //Update data
      this.departmentService.updateDepartment(this.id, this.department).subscribe(
        (data: string) => {
          this.model.content = data;
          this.dialog.open(this.messageDialog, this.dialogConfig);
        },
        error => {
          this.model.title = "Error";
          this.model.content = error.globalError;
          this.dialog.open(this.messageDialog, this.dialogConfig);
        }
      );
    } else {

      //Add data  
      this.departmentService.createDepartment(this.department).subscribe(
        (data: string) => {
          this.model.content = data;
          this.dialog.open(this.messageDialog, this.dialogConfig);
        },
        error => {
          this.model.title = "Error";
          this.model.content = error.error;
          this.dialog.open(this.messageDialog, this.dialogConfig);
        }
      );
    }
    this.form.reset();  
  }

  reset() {

    if (!isNullOrUndefined(this.id)) {
     
      this.getDataById();
    } else {
      this.form.reset();
    }
  }

  getDataById() {
    this.departmentService.getDepartmentById(this.id).subscribe(
      (data: Department) => {

        //Assign db values to controls.
        this.form.patchValue({
          name: data.name,
          description: data.description
        });
      },
      error => {
        this.model.title = "Error";
        this.model.title = error.globalError;
        this.dialog.open(this.messageDialog, this.dialogConfig);
      }
    );

  }
}
