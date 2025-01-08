import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, switchMap, take, tap } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-single-employee',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './single-employee.component.html',
  styleUrl: './single-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleEmployeeComponent implements OnInit {
  loading$!: Observable<boolean>;
  employee$!: Observable<Employee>;

  constructor(
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.employeesService.getEmployeesFromServer();
  }

  private initObservables(): void {
    this.loading$ = this.employeesService.loading$;
    // this.employee$ = this.employeesService.getEmployeeById();
    this.employee$ = this.route.params.pipe(
      switchMap((params) =>
        // +params['id'] converts string to number - casting cause id in params is string and id in Employee model is number
        this.employeesService.getEmployeeById(+params['id'])
      )
    );
  }

  onHire() {
    this.employee$
      .pipe(
        take(1),
        tap((employee: Employee) => {
          this.employeesService.hireEmployee(employee.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onRefuse() {
    this.employee$
      .pipe(
        take(1),
        tap((employee: Employee) => {
          this.employeesService.refuseEmployee(employee.id);
          this.onGoBack();
        })
      )
      .subscribe();
  }

  onGoBack() {
    this.router.navigateByUrl('/reactive-state/employees');
  }
}
