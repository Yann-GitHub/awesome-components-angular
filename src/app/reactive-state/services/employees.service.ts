import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable()
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

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }
}
