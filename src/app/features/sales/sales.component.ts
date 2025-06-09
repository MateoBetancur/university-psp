import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Sale } from './interfaces/sale.interface';
import { Employee } from '../employees/interfaces/employee.interface';
import { SalesStorageService } from './services/sales-storage.service';
import { EmployeeStorageService } from '../employees/services/employee-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  employees: Employee[] = [];
  selectedEmployeeId: string = '';
  newSale: Sale = this.getEmptySale();
  successMessage = '';

  constructor(
    private salesStorageService: SalesStorageService,
    private employeeStorageService: EmployeeStorageService
  ) {}

  ngOnInit(): void {
    this.sales = this.salesStorageService.load();
    this.employees = this.employeeStorageService.load();
  }

  saveSale(): void {
    const selectedEmployee = this.employees.find(
      (e) => e.id === this.selectedEmployeeId
    );
    if (!selectedEmployee) {
      return;
    }

    this.newSale.id = uuidv4();
    this.newSale.employeeId = selectedEmployee.id;
    this.newSale.employeeName = selectedEmployee.name;
    this.newSale.role = selectedEmployee.role;

    this.sales.push({ ...this.newSale });
    this.salesStorageService.save(this.sales);
    this.successMessage = '¡Venta registrada exitosamente!';
    this.newSale = this.getEmptySale();
    this.selectedEmployeeId = '';

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private getEmptySale(): Sale {
    return {
      id: '',
      employeeId: '',
      employeeName: '',
      role: '',
      amount: 0,
      date: '',
    };
  }
}
