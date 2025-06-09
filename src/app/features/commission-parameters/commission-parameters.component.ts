import { Component } from '@angular/core';
import { CommissionParameter } from '../../core/commission/interfaces/commission-parameter.interface';
import { CommissionStorageService } from '../../core/commission/services/commission-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-commission-parameters',
  imports: [FormsModule, CommonModule],
  templateUrl: './commission-parameters.component.html',
  styleUrl: './commission-parameters.component.scss',
})
export class CommissionParametersComponent {
  parameters: CommissionParameter[] = [];
  successMessage = '';

  constructor(private storageService: CommissionStorageService) {}

  ngOnInit(): void {
    this.parameters = this.storageService.load();
    if (this.parameters.length === 0) {
      this.parameters.push({ role: '', percentage: 0 });
    }
  }

  addParameter(): void {
    this.parameters.push({ role: '', percentage: 0 });
  }

  removeParameter(index: number): void {
    this.parameters.splice(index, 1);
  }

  saveParameters(): void {
    this.storageService.save(this.parameters);
    this.successMessage = '¡Parámetros guardados exitosamente!';
    setTimeout(() => (this.successMessage = ''), 3000);
  }
}
