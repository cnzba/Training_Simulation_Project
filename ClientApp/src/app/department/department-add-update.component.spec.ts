import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAddUpdateComponent } from './department-create.component';

describe('DepartmentCreateComponent', () => {
  let component: DepartmentAddUpdateComponent;
  let fixture: ComponentFixture<DepartmentAddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
