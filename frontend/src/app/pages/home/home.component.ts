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
  sanguches: Producto[] = [];
  comidas: Producto[] = [];
  postres: Producto[] = [];
  snacks: Producto[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Obtener todos los productos del servicio
    const allProducts = this.productService.obtenerProductos();
    
    // Organizar los productos por categoría y limitar a 5 productos
    this.bebidas = allProducts.filter(product => product.categoria === 'Bebida').slice(0, 5); // Limitar a los primeros 5 productos

    // Organizar los productos por categoría y limitar a 5 productos
    this.sanguches = allProducts.filter(product => product.categoria === 'Sanguches').slice(0, 5); // Limitar a los primeros 5 productos

    // Organizar los productos por categoría y limitar a 5 productos
    this.comidas = allProducts.filter(product => product.categoria === 'Comidas').slice(0, 5); // Limitar a los primeros 5 productos

    // Organizar los productos por categoría y limitar a 5 productos
    this.postres = allProducts.filter(product => product.categoria === 'Postres').slice(0, 5); // Limitar a los primeros 5 productos

    // Organizar los productos por categoría y limitar a 5 productos
    this.snacks = allProducts.filter(product => product.categoria === 'Snacks').slice(0, 5); // Limitar a los primeros 5 productos


  }
}
