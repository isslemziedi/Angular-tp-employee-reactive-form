import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeServiceService } from './employee-service.service';
import { Employee } from '../model/employee';

@Component({
  selector: 'app-your-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class ReactiveFormComponent implements OnInit {
  employees: Employee[] = [];
  employeeId: number = 0; // or initialize it with a default value
  myForm: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeServiceService
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
    name: ['', Validators.required],
    status: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  

    this.route.params.subscribe(params => {
      this.employeeId = +params['id'];

      if (this.employeeId) {
        this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
          this.myForm.patchValue(employee);
        });
      }
    });
  }
  onSubmit() {
    const formData = this.myForm.value;
  
    if (this.employeeId) {
      const updatedEmployee: Employee = { id: this.employeeId, ...formData };
      this.employeeService.updateEmployee(updatedEmployee).subscribe(response => {
        console.log('Employee updated successfully:', response);
      });
    } else {
      this.employeeService.addEmployee(formData).subscribe(response => {
        console.log('Employee added successfully:', response);
      });
    }
  }
  
  get name() {
    return this.myForm.get('name');
  }
  
  get status() {
    return this.myForm.get('status');
  }
  
  get tel() {
    return this.myForm.get('tel');
  }
  
  get email() {
    return this.myForm.get('email');
  }
  
}
