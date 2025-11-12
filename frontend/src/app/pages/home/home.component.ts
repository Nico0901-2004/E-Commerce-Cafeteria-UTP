import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Producto } from '../../models/Product';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ModalProductComponent } from '../../components/modal-product/modal-product.component';

declare var bootstrap: any; // Importamos el JS de bootstrap

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCardComponent, ModalProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  bebidas: Producto[] = [];
  sanguches: Producto[] = [];
  comidas: Producto[] = [];
  postres: Producto[] = [];
  snacks: Producto[] = [];

  selectedProduct: Producto | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    const allProducts = this.productService.obtenerProductos();
    this.bebidas = allProducts.filter(p => p.categoria === 'Bebida').slice(0, 5);
    this.sanguches = allProducts.filter(p => p.categoria === 'Sanguches').slice(0, 5);
    this.comidas = allProducts.filter(p => p.categoria === 'Comidas').slice(0, 5);
    this.postres = allProducts.filter(p => p.categoria === 'Postres').slice(0, 5);
    this.snacks = allProducts.filter(p => p.categoria === 'Snacks').slice(0, 5);
  }

  openModal(product: Producto) {
    console.log('Abriendo modal para:', product); // 🔹 Para verificar que se ejecuta
    this.selectedProduct = product;

    const modalEl = document.getElementById('productModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    } else {
      console.error('❌ No se encontró el modal con id productModal');
    }
  }
}
