import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  tap,
  delay,
  map,
  switchMap,
  take,
} from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {}

  private _loading$ = new BehaviorSubject<boolean>(false);

  // Getter is better than method in this case. Can be used as a property
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }
  // getLoading() : Observable<boolean> {
  //   return this._loading$.asObservable();
  // }

  private _employees$ = new BehaviorSubject<Employee[]>([]);
  // Getter is better than method in this case. Can be used as a property
  get employees$(): Observable<Employee[]> {
    return this._employees$.asObservable();
  }

  private lastEmployeesLoad = 0;

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }

  getEmployeesFromServer(): void {
    console.log('Getting employees from server');
    // Prevent multiple requests in a short period of time (5 minutes) -
    if (Date.now() - this.lastEmployeesLoad <= 300000) {
      console.log('Preventing multiple requests');
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<Employee[]>(`${environment.apiUrl}/candidates`)
      .pipe(
        delay(2000),
        tap((employees) => {
          // Time of the last request
          this.lastEmployeesLoad = Date.now();
          this._employees$.next(employees);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getEmployeeById(id: number): Observable<Employee> {
    if (!this.lastEmployeesLoad) {
      this.getEmployeesFromServer();
    }
    return this.employees$.pipe(
      // map((employees) => employees.filter((employee) => employee.id === id)[0])
      map(
        (employees) =>
          employees.find((employee) => employee.id === id) as Employee
      )
    );
  }

  refuseEmployee(id: number): void {
    this.setLoadingStatus(true);
    // Pessimistic approach - wait for the response from the server
    this.http
      .delete(`${environment.apiUrl}/candidates/${id}`)
      .pipe(
        delay(1000),
        switchMap(() => this.employees$),
        take(1),
        map((employees) => employees.filter((employee) => employee.id !== id)),
        tap((employees) => {
          this._employees$.next(employees);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }
}
