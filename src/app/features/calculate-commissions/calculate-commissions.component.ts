import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Sale } from '../sales/interfaces/sale.interface';
import { CommissionParameter } from '../../core/commission/interfaces/commission-parameter.interface';
import { CommissionSummary } from './interfaces/commission-summary.model';
import { SalesStorageService } from '../sales/services/sales-storage.service';
import { CommissionStorageService } from '../../core/commission/services/commission-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculate-commissions',
  templateUrl: './calculate-commissions.component.html',
  imports: [CommonModule],
  styleUrls: ['./calculate-commissions.component.scss'],
})
export class CalculateCommissionsComponent implements OnInit {
  sales: Sale[] = [];
  commissionParameters: CommissionParameter[] = [];
  commissionSummaries: CommissionSummary[] = [];
  topEmployees: CommissionSummary[] = [];

  constructor(
    private salesStorageService: SalesStorageService,
    private commissionStorageService: CommissionStorageService
  ) {}

  ngOnInit(): void {
    this.sales = this.salesStorageService.load();
    this.commissionParameters = this.commissionStorageService.load();
    this.calculateCommissions();
    this.renderCharts();
  }

  calculateCommissions(): void {
    const summaryMap: { [employeeId: string]: CommissionSummary } = {};

    this.sales.forEach((sale) => {
      const commissionParam = this.commissionParameters.find(
        (param) => param.role === sale.role
      );

      const commissionRate = commissionParam
        ? commissionParam.percentage / 100
        : 0;
      const commissionAmount = sale.amount * commissionRate;

      if (!summaryMap[sale.employeeId]) {
        summaryMap[sale.employeeId] = {
          employeeId: sale.employeeId,
          employeeName: sale.employeeName,
          totalSales: 0,
          totalCommission: 0,
        };
      }

      summaryMap[sale.employeeId].totalSales += sale.amount;
      summaryMap[sale.employeeId].totalCommission += commissionAmount;
    });

    this.commissionSummaries = Object.values(summaryMap);
    this.topEmployees = [...this.commissionSummaries]
      .sort((a, b) => b.totalCommission - a.totalCommission)
      .slice(0, 3);
  }

  renderCharts(): void {
    // Gráfico de barras
    const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: this.commissionSummaries.map((s) => s.employeeName),
        datasets: [
          {
            label: 'Total Comisión',
            data: this.commissionSummaries.map((s) => s.totalCommission),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Gráfico de torta
    const pieCtx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(pieCtx, {
      type: 'pie',
      data: {
        labels: this.commissionSummaries.map((s) => s.employeeName),
        datasets: [
          {
            data: this.commissionSummaries.map((s) => s.totalCommission),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }
}
