import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-single-employee',
  standalone: true,
  imports: [],
  templateUrl: './single-employee.component.html',
  styleUrl: './single-employee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleEmployeeComponent {}
