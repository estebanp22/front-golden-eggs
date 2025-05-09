// src/app/core/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: CartItem): void {
    const items = this.cartItemsSubject.value;
    const index = items.findIndex(p => p.name === item.name);

    if (index > -1) {
      items[index].quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cartItemsSubject.next([...items]);
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  removeItem(index: number): void {
    const items = this.cartItemsSubject.value;
    items.splice(index, 1);
    this.cartItemsSubject.next([...items]);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
