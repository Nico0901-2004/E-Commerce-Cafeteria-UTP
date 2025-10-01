import { Component, Input } from '@angular/core';
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
  @Input() product!: Producto;  // Recibe un solo producto como entrada

  constructor(private cartService: CartService){}

  addToCart() {
    this.cartService.addItem({
      id: this.product.id,
      name: this.product.descripcion,
      price: this.product.precio,
      image: this.product.imagen
    }, 1);
    alert('Producto agregado al carrito');
  }
}
