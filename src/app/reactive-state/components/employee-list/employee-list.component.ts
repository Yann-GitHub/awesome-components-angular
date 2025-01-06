import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Prevents lake of performance/ reduced the possibilities of change detection
})
export class EmployeeListComponent implements OnInit {
  loading$!: Observable<boolean>;
  employees$!: Observable<Employee[]>;

  constructor(
    private router: Router,
    private EmployeesService: EmployeesService
  ) {}

  ngOnInit(): void {
    this.initObservables();
    this.EmployeesService.getEmployeesFromServer();
  }

  private initObservables(): void {
    this.loading$ = this.EmployeesService.loading$;
    this.employees$ = this.EmployeesService.employees$;
  }
}
