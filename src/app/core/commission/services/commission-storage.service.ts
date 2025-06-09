import { Injectable } from '@angular/core';
import { CommissionParameter } from '../interfaces/commission-parameter.interface';

const STORAGE_KEY = 'commissionParameters';

@Injectable({
  providedIn: 'root',
})
export class CommissionStorageService {
  constructor() {}

  save(parameters: CommissionParameter[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parameters));
  }

  load(): CommissionParameter[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
