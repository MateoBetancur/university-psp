import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataInitializerService } from './core/init/data-initializer.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'university-psp';

  constructor(private dataInitializerService: DataInitializerService) {}

  ngOnInit(): void {
    this.dataInitializerService.initialize();
  }
}
