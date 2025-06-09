import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { CommissionParameter } from '../../core/commission/interfaces/commission-parameter.interface';
import { SalesStorageService } from './services/sales-storage.service';
import { CommissionStorageService } from '../../core/commission/services/commission-storage.service';
import { Sale } from './interfaces/sale.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent implements OnInit {
  sales: Sale[] = [];
  commissionParameters: CommissionParameter[] = [];
  newSale: Sale = this.getEmptySale();
  successMessage = '';

  constructor(
    private salesStorageService: SalesStorageService,
    private commissionStorageService: CommissionStorageService
  ) {}

  ngOnInit(): void {
    this.sales = this.salesStorageService.load();
    this.commissionParameters = this.commissionStorageService.load();
  }

  saveSale(): void {
    this.newSale.id = uuidv4(); // genera ID único
    this.sales.push({ ...this.newSale });
    this.salesStorageService.save(this.sales);
    this.successMessage = '¡Venta registrada exitosamente!';
    this.newSale = this.getEmptySale();

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  private getEmptySale(): Sale {
    return {
      id: '',
      employeeName: '',
      role: '',
      amount: 0,
      date: '',
    };
  }
}
