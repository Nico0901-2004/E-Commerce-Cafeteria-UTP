import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../models/Product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Producto;
  @Output() productClick = new EventEmitter<Producto>(); // 🔹 Evento para el clic del card

  constructor(private cartService: CartService) {}

  // 🔹 Método que emite el producto al hacer clic en la tarjeta
  onCardClick() {
    this.productClick.emit(this.product);
  }

  // 🔹 Método para agregar al carrito sin abrir el modal
  addToCart(event: Event) {
    event.stopPropagation(); // Evita que el clic del botón dispare el modal
    this.cartService.addItem({
      id: this.product.id,
      name: this.product.descripcion,
      price: this.product.precio,
      image: this.product.imagen
    }, 1);
    alert('Producto agregado al carrito');
  }
}
