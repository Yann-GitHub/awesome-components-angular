import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable, catchError, of } from 'rxjs';
import { ComplexFormValue } from '../models/complex-form-value.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.apiUrl}/users`, formValue)
      .pipe(
        map(() => true),
        delay(1000),
        catchError(() => of(false).pipe(delay(1000)))
      );
  }
}
