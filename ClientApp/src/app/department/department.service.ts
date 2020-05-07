import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDepartment } from './department-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private departmentUrl = 'api/Department';

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get(this.departmentUrl);
  }

  getDepartmentById(id: number) {
    return this.http.get(this.departmentUrl + "/" + id);
  }

  deleteDepartment(id: number) {
    return this.http.delete(this.departmentUrl + "/" + id);
  }

  updateDepartment(id: number, dept: IDepartment) {
    return this.http.put(this.departmentUrl + "/" + id, dept);
  }

  createDepartment(dept: IDepartment) {
    return this.http.post(this.departmentUrl, dept);
  }
}
