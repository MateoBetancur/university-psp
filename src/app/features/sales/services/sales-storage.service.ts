import { Injectable } from '@angular/core';
import { Sale } from '../interfaces/sale.interface';

const STORAGE_KEY = 'sales';

@Injectable({
  providedIn: 'root',
})
export class SalesStorageService {
  save(sales: Sale[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sales));
  }

  load(): Sale[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
