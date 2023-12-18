import { Component } from '@angular/core';
import { EmployeeServiceService } from './employee-service.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  employees = new Array<Employee>();
  showReactiveForm = false;

  constructor(private empService: EmployeeServiceService) {
    this.refreshEmployees();
  }

  private refreshEmployees(): void {
    this.empService.getEmployees().subscribe(response => this.employees = response);
  }

  addEmployee(name: string, status: string, tel: number, email: string): void {
    const newEmployee = new Employee(0, name, status, tel, email);
    this.empService.addEmployee(newEmployee).subscribe(() => {
      this.refreshEmployees();
      this.hideReactiveForm();
    });
  }

  updateEmployee(employee: Employee, n: string, s: string, t: number, e: string): void {
    employee.name = n;
    employee.status = s;
    employee.tel = t;
    employee.email = e;
    this.empService.updateEmployee(employee).subscribe(() => this.refreshEmployees());
  }

  deleteEmployee(id: number): void {
    this.empService.deleteEmployee(id).subscribe(() => this.refreshEmployees());
  }

  hideReactiveForm() {
    this.showReactiveForm = false;
  }
}