import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleEmployeeComponent } from './single-employee.component';

describe('SingleEmployeeComponent', () => {
  let component: SingleEmployeeComponent;
  let fixture: ComponentFixture<SingleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
