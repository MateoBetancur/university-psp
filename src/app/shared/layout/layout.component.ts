import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  constructor(private authService: AuthService) { }


  onLogout() {
    this.authService.logout();
  }
}
