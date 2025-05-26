import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  // Aquí puedes manejar lógica de navegación, usuario, etc.
}
