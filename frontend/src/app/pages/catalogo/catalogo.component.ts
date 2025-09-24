import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/Product';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, CommonModule, ProductCardComponent],
  providers: [ProductService], // Aquí se provee el servicio
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})

export class CatalogoComponent implements OnInit {
  categories: string[] = ['Bebidas', 'Sanguches', 'Comidas', 'Postres', 'Snacks'];
  products: Producto[] = [];
  selectedCategory: string = 'Bebidas';  // Default category
  sidebarVisible: boolean = false;  // Default sidebar visibility
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.obtenerProductos();
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }

  getProductsByCategory(category: string): Producto[] {
    return this.products.filter(product => product.categoria === category);
  }
}
