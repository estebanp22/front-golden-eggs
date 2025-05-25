// cart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartItem, CartService, Order} from './services/cart.service';
import { AuthService } from '../../core/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  private userId: number | null = null;
  order: Order = this.resetOrder();

  constructor(public auth: AuthService, private cartService: CartService) {
    try {
      const user = this.auth.getUserFromToken();
      this.auth.getUserData(user.sub).subscribe(data => {
        this.userId = data.id;

        const storageKey = this.getStorageKey();
        const savedCart = storageKey ? localStorage.getItem(storageKey) : null;

        if (savedCart) {
          this.cartItems = JSON.parse(savedCart);
        }
      });
    } catch (error) {
      console.error('Error initializing cart', error);
      this.userId = null;
    }
  }


  save(){

    const storageKey = this.getStorageKey();
    const savedCart = storageKey ? localStorage.getItem(storageKey) : null;

    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.order = this.resetOrder();
      console.log(this.order);
      this.cartService.saveOrder(this.order).subscribe({
        next: () => {
          Swal.fire('¡Éxito!', 'Producto guardado correctamente.', 'success');
          this.resetOrder();
        },
        error: (error) => {
          this.handleError(error, 'guardar');
        }
      });
    }
  }

  private handleError(error: any, action: string): void {
    const mensaje = error?.error?.message || `Ocurrió un error al ${action} el producto.`;
    Swal.fire('¡Error!', mensaje, 'error');
  }

  private getStorageKey(): string | null {
    return this.userId !== null ? `cart_${this.userId}` : 'cart_guest';
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  private saveCart(): void {
    const storageKey = this.getStorageKey();
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(this.cartItems));
    }
  }

  resetOrder() {
    return {
      idCustomer: this.userId,
      cartItem: this.cartItems,
      totalPrice: this.cartItems.reduce(
        (total, item) => total + (Number(item.price) * Number(item.quantity)),
        0
      ),
      orderDate: new Date().toISOString(), // o cualquier formato que uses
      state: "PENDIENTE"
    };
  }
}
