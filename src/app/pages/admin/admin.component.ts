import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForOf } from '@angular/common';
import {AdminService} from './services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private visitService: AdminService) {}

  stats = [
    { label: 'Ingresos', value: '$122,000', icon: '💰', color: '#27ae60' },
    { label: 'Egresos', value: '$50,000', icon: '📤', color: '#c0392b' },
    { label: 'Ordenes', value: 92, icon: '🛒', color: '#2980b9' },
    { label: 'Huevos en stock', value: 580, icon: '🥚', color: '#f39c12' },
    { label: 'Clientes', value: 120, icon: '👥', color: '#8e44ad' },
    { label: 'Empleados', value: 7, icon: '🧑‍🍳', color: '#16a085' },
    { label: 'Visitas a la web', value: 0, icon: '🌐', color: '#34495e' }
  ];

  areas = [
    { nombre: 'Productos', ruta: '/admin/productos', icon: '📦' },
    { nombre: 'Ventas', ruta: '/admin/ventas', icon: '🧾' },
    { nombre: 'Estadísticas', ruta: '/admin/estadisticas', icon: '📈' },
    { nombre: 'Inventarios', ruta: '/admin/inventarios', icon: '📋' },
    { nombre: 'Clientes', ruta: '/admin/clientes', icon: '👥' },
    { nombre: 'Recursos Humanos', ruta: '/admin/rrhh', icon: '🧑‍💼' },
    { nombre: 'Finanzas', ruta: '/admin/finanzas', icon: '💸' },
    { nombre: 'Configuración', ruta: '/admin/configuracion', icon: '⚙️' }
  ];


  ngOnInit(): void {
    // Obtener el número de visitas y actualizar el campo correspondiente
    this.visitService.getVisitCount().subscribe(count => {
      const visitasStat = this.stats.find(stat => stat.label === 'Visitas a la web');
      if (visitasStat) {
        visitasStat.value = count;  // Actualiza el valor de visitas a la web
      }
    });
  }

  irARuta(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
