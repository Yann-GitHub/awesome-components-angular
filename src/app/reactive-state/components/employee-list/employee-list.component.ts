import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, map, startWith, combineLatest } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';
import { Employee } from '../../models/employee.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormControl, FormsModule } from '@angular/forms';
import { EmployeeSearchType } from '../../enum/employee-search-type';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatOptionModule,
    MatIconModule,
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush, // Prevents lake of performance/ reduced the possibilities of change detection
})
export class EmployeeListComponent implements OnInit {
  loading$!: Observable<boolean>;
  employees$!: Observable<Employee[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  searchTypeOptions!: {
    value: EmployeeSearchType;
    label: string;
  }[];

  constructor(
    private router: Router,
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.employeesService.getEmployeesFromServer();
  }

  private initForm(): void {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(EmployeeSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: EmployeeSearchType.LASTNAME, label: 'Nom' },
      { value: EmployeeSearchType.FIRSTNAME, label: 'Prénom' },
      { value: EmployeeSearchType.COMPANY, label: 'Entreprise' },
    ];
  }

  private initObservables(): void {
    this.loading$ = this.employeesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map((value) => value.toLowerCase())
    );
    const searchType$: Observable<EmployeeSearchType> =
      this.searchTypeCtrl.valueChanges.pipe(
        startWith(this.searchTypeCtrl.value)
      );
    // this.employees$ = this.employeesService.employees$;
    // Combine the search, searchType and employees observables to get the filtered employees - combined observables as tuple
    this.employees$ = combineLatest([
      search$,
      searchType$,
      this.employeesService.employees$,
    ]).pipe(
      map(([search, searchType, employees]) =>
        employees.filter((employee) =>
          employee[searchType].toLowerCase().includes(search as string)
        )
      )
    );
  }
}
