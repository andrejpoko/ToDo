import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsListComponent } from './items-list/items-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'to-do-list';
}
