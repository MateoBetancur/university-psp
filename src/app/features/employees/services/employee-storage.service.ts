import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';

const STORAGE_KEY = 'employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeStorageService {
  save(employees: Employee[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
  }

  load(): Employee[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
