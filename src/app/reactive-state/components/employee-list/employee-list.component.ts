import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Prevents lake of performance/ reduced the possibilities of change detection
})
export class EmployeeListComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private EmployeesService: EmployeesService) {}

  ngOnInit(): void {
    this.loading$ = this.EmployeesService.loading$;
  }
}
