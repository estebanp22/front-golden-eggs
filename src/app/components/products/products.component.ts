import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 esto es lo que hace funcionar *ngFor y *ngIf

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule], // Necesario para usar *ngFor
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductosComponent {  // Asegúrate de que la clase sea 'ProductosComponent'
  productos = [
    {
      nombre: 'Huevo AAA - Cubeta 30 unidades',
      descripcion: 'Huevos frescos tamaño AAA, ideales para el hogar y negocios.',
      precio: 12000,
      imagen: 'assets/huevo_aaa.jpg'
    },
    {
      nombre: 'Huevo AA - Cubeta 30 unidades',
      descripcion: 'Huevos de tamaño AA, excelente relación calidad/precio.',
      precio: 11000,
      imagen: 'assets/huevo_aa.jpg'
    },
    {
      nombre: 'Huevo A x12',
      descripcion: 'Huevo de tamaño A, más natural y nutritivo.',
      precio: 8000,
      imagen: 'assets/huevo_a.jpg'
    }
    // Agrega más productos aquí
  ];
}
