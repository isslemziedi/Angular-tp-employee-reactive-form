import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../model/employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  private baseUrl = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  public getEmployeeById(id: number): Observable<Employee> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }

  public deleteEmployee(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
