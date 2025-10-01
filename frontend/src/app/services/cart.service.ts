import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private storageKey = 'cart';
  private items$ = new BehaviorSubject<CartItem[]>(this.loadFromStorage());
  items = this.items$.asObservable();

  private save(items: CartItem[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.items$.next(items);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  getItems(): CartItem[] {
    return this.items$.value;
  }

  addItem(product: { id: number; name: string; price: number; image?: string }, qty = 1) {
    const items = [...this.items$.value];
    const existing = items.find(i => i.productId === product.id);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: qty
      });
    }
    this.save(items);
  }

  removeItem(productId: number) {
    const items = this.items$.value.filter(i => i.productId !== productId);
    this.save(items);
  }

  updateQuantity(productId: number, qty: number) {
    const items = [...this.items$.value];
    const item = items.find(i => i.productId === productId);
    if (!item) return;
    item.quantity = Math.max(1, Math.floor(qty));
    this.save(items);
  }

  clearCart() {
    this.save([]);
  }

  getTotal(): number {
    return this.items$.value.reduce((s, i) => s + i.price * i.quantity, 0);
  }

  getCount(): number {
    return this.items$.value.reduce((s, i) => s + i.quantity, 0);
  }
}