import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from './interfaces/employee.interface';
import { CommissionParameter } from '../../core/commission/interfaces/commission-parameter.interface';
import { EmployeeStorageService } from './services/employee-storage.service';
import { CommissionStorageService } from '../../core/commission/services/commission-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  commissionParameters: CommissionParameter[] = [];
  newEmployee: Employee = this.getEmptyEmployee();
  successMessage = '';

  constructor(
    private employeeStorageService: EmployeeStorageService,
    private commissionStorageService: CommissionStorageService
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeStorageService.load();
    this.commissionParameters = this.commissionStorageService.load();
  }

  saveEmployee(): void {
    this.newEmployee.id = uuidv4();
    this.employees.push({ ...this.newEmployee });
    this.employeeStorageService.save(this.employees);
    this.successMessage = '¡Empleado registrado exitosamente!';
    this.newEmployee = this.getEmptyEmployee();

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private getEmptyEmployee(): Employee {
    return {
      id: '',
      name: '',
      role: '',
    };
  }
}
