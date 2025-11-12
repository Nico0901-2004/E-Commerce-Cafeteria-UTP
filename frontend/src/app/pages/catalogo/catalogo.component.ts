import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/Product';
import { ModalProductComponent } from '../../components/modal-product/modal-product.component';

declare var bootstrap: any;

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [SidebarComponent, ModalProductComponent, CommonModule, ProductCardComponent],
  providers: [ProductService],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  categories = ['Bebida', 'Sanguches', 'Comidas', 'Postres', 'Snacks'];
  products: Producto[] = [];
  selectedCategory = 'Bebida';
  selectedProduct!: Producto;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.obtenerProductos();
  }

  onCategorySelected(category: string): void {
    this.selectedCategory = category;
  }

  getProductsByCategory(category: string): Producto[] {
    return this.products.filter(p => p.categoria === category);
  }

  openModal(product: Producto) {
      this.selectedProduct = product;
      const modalEl = document.getElementById('productModal');
      if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    }
}
