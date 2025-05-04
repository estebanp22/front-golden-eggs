import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { label: 'Total Clientes', value: 120, icon: '👥', color: '#3498db' },
    { label: 'Productos', value: 58, icon: '📦', color: '#e67e22' },
    { label: 'Ordenes', value: 92, icon: '🛒', color: '#2ecc71' },
    { label: 'Ingresos', value: '$122,000', icon: '💰', color: '#9b59b6' }
  ];
}
