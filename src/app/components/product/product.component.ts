import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ProductService, Product } from './services/product.service';
import {NgForOf} from '@angular/common';
import {AuthService} from '../../core/auth.service';
import {CartItem, CartService} from '../../pages/cart/services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  imports: [NgForOf],
  styleUrls: ['./product.component.css']
})

export class ProductosComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductService,
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        console.log("Datos recibidos:", data);
        this.products = data;
      },
      error: (err) => console.error("Error al cargar los productos", err)
    })
  }
  @Output() openLogin = new EventEmitter<void>();

  agregarProducto(product: Product){
    if(!this.authService.isLoggedIn()) {
      this.openLogin.emit();
      console.log("Entro");
      return;
    }
    const item: CartItem={
      name: product.inventory.nameProduct,
      price: product.salePrice,
      quantity: 1
    };
    console.log(item);
    this.cartService.addToCart(item);
    console.log("Producto agregado", product);
  }
}


