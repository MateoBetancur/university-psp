import { Injectable } from '@angular/core';
import { CommissionStorageService } from '../commission/services/commission-storage.service';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeStorageService } from '../../features/employees/services/employee-storage.service';
import { SalesStorageService } from '../../features/sales/services/sales-storage.service';
import { CommissionParameter } from '../commission/interfaces/commission-parameter.interface';
import { Employee } from '../../features/employees/interfaces/employee.interface';
import { Sale } from '../../features/sales/interfaces/sale.interface';

@Injectable({
  providedIn: 'root',
})
export class DataInitializerService {
  constructor(
    private commissionStorageService: CommissionStorageService,
    private employeeStorageService: EmployeeStorageService,
    private salesStorageService: SalesStorageService
  ) {}

  initialize(): void {
    this.initCommissionParameters();
    this.initEmployees();
    this.initSales();
  }

  private initCommissionParameters(): void {
    const existing = this.commissionStorageService.load();
    if (existing.length === 0) {
      const dummyParams: CommissionParameter[] = [
        { role: 'Junior', percentage: 5 },
        { role: 'Senior', percentage: 10 },
        { role: 'Manager', percentage: 15 },
      ];
      this.commissionStorageService.save(dummyParams);
    }
  }

  private initEmployees(): void {
    const existing = this.employeeStorageService.load();
    if (existing.length === 0) {
      const roles = ['Junior', 'Senior', 'Manager'];
      const names = ['Brahian', 'Mateo', 'Javier', 'Jeisson', 'Wilmer'];

      const dummyEmployees: Employee[] = names.map((name) => ({
        id: uuidv4(),
        name,
        role: roles[Math.floor(Math.random() * roles.length)],
      }));

      this.employeeStorageService.save(dummyEmployees);
    }
  }

  private initSales(): void {
    const existing = this.salesStorageService.load();
    if (existing.length === 0) {
      const employees = this.employeeStorageService.load();
      const dummySales: Sale[] = employees.map((e) => ({
        id: uuidv4(),
        employeeId: e.id,
        employeeName: e.name,
        role: e.role,
        amount: Math.floor(Math.random() * 5000 + 1000), // ventas entre 1000 y 6000
        date: new Date().toISOString().split('T')[0], // hoy
      }));

      this.salesStorageService.save(dummySales);
    }
  }
}
