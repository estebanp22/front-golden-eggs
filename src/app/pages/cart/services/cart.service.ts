// src/app/core/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {AuthService} from '../../../core/auth.service';

export interface CartItem {
  id: number;
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
  private userId: number;

  constructor(private auth: AuthService) {
    this.userId = this.auth.getUserFromToken().id;
    const savedCart = localStorage.getItem(`cart_${this.userId}`);
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  addToCart(item: CartItem): void {
    const items = [...this.cartItemsSubject.value];
    const existingItem = items.find(p => p.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }

    this.cartItemsSubject.next(items);
    localStorage.setItem(`cart_${this.userId}`, JSON.stringify(items));
  }

  getItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  removeItem(index: number): void {
    const items = [...this.cartItemsSubject.value];
    items.splice(index, 1);
    this.cartItemsSubject.next(items);
    localStorage.setItem(`cart_${this.userId}`, JSON.stringify(items));
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem(`cart_${this.userId}`);
  }
}
