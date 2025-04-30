import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product} from './services/product.service';
import { HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Necesario para usar *ngFor
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductosComponent implements OnInit{  // Asegúrate de que la clase sea 'ProductosComponent'
  products: Product[] = [];
  @Input() product: any;

  constructor(private productsService: ProductService) {
  }
  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) =>console.error("Error al cargar los productos", err)
    })
  }
}
