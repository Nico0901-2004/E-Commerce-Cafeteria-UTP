import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/Product';
import { HeaderComponent } from '../../components/header/header.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductCardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Definir las categorías de productos
  bebidas: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Obtener todos los productos del servicio
    const allProducts = this.productService.obtenerProductos();
    
    // Organizar los productos por categoría y limitar a 5 productos
    this.bebidas = allProducts.filter(product => product.categoria === 'Bebida').slice(0, 5); // Limitar a los primeros 5 productos
  }
}
