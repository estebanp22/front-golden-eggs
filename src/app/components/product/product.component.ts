import {Component, OnInit} from '@angular/core';
import { ProductService, Product } from './services/product.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./product.component.css']
})


export class ProductosComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);
        this.products = data;
      },
      error: (err) => console.error("Error al cargar los productos", err)
    })
  }
}


