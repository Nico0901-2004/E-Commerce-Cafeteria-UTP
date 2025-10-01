import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {
    // Suscribimos para que el componente actualice automáticamente cuando cambie el carrito
    this.cartService.items.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  increase(item: CartItem) {
    this.cartService.updateQuantity(item.productId, item.quantity + 1);
  }

  decrease(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.productId, item.quantity - 1);
    }
  }

  onQtyChange(item: CartItem) {
    // cuando se cambia el input manualmente
    this.cartService.updateQuantity(item.productId, item.quantity);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item.productId);
  }

  checkout() {
    // aquí simulas el pago / pedido. Más adelante conectarás con backend.
    if (this.cartItems.length === 0) return;
    // ejemplo: guardar un pedido local o llamar a un servicio
    alert(`Compra realizada. Total: S/. ${this.total}`);
    this.cartService.clearCart();
  }
}