import { Component, EventEmitter, Output } from '@angular/core';
import {Router} from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [
    NgForOf
  ],
  standalone: true
})
export class SidebarComponent {
  constructor(private router: Router) {}

  areas = [
    { nombre: 'Dashboard', ruta: '/admin/dashboard' },
    { nombre: 'Productos', ruta: 'productos' },
    { nombre: 'Ventas', ruta: 'ventas' },
    { nombre: 'Estadísticas', ruta: 'estadisticas' },
    { nombre: 'Inventarios', ruta: 'inventarios' },
    { nombre: 'Clientes', ruta: 'clientes' },
    { nombre: 'Recursos Humanos', ruta: 'rrhh' },
    { nombre: 'Finanzas', ruta: 'finanzas' },
    { nombre: 'Configuración', ruta: 'configuracion' }
  ];

  seleccionarArea(ruta: string): void {
    this.router.navigate([ruta]);
  }
}

