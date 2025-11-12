import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { ProductFormModalComponent } from '../../../components/product-form-modal/product-form-modal.component';

@Component({
  selector: 'app-productos-admin',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ProductFormModalComponent],
  templateUrl: './productos-admin.component.html',
  styleUrls: ['./productos-admin.component.css']
})
export class ProductosAdminComponent {
  productos = [
    { id: 1, nombre: 'Café Expreso', descripcion: 'Fuerte y aromático', precio: 6.5, stock: 10, imagenUrl: 'expreso.jpg', isActive: true },
    { id: 2, nombre: 'Cappuccino', descripcion: 'Suave y espumoso', precio: 7.5, stock: 5, imagenUrl: 'cappuccino.jpg', isActive: true },
    { id: 3, nombre: 'Croissant', descripcion: 'Crujiente y mantecoso', precio: 4.2, stock: 2, imagenUrl: 'croissant.jpg', isActive: false },
    { id: 4, nombre: 'Latte', descripcion: 'Con leche cremosa', precio: 8.0, stock: 8, imagenUrl: 'latte.jpg', isActive: true },
  ];

  // Paginación
  paginaActual = 1;
  productosPorPagina = 7;

  // Modal
  mostrarModal = false;
  modoModal: 'crear' | 'editar' = 'crear';
  productoSeleccionado: any = null;

  get productosPaginados() {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productos.slice(inicio, inicio + this.productosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }

  // === MODAL ===
  crearProducto() {
    this.modoModal = 'crear';
    this.productoSeleccionado = null;
    this.mostrarModal = true;
  }

  editarProducto(producto: any) {
    this.modoModal = 'editar';
    this.productoSeleccionado = producto;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  guardarProducto(producto: any) {
    if (this.modoModal === 'crear') {
      const nuevoId = this.productos.length + 1;
      this.productos.push({ id: nuevoId, ...producto, isActive: true });
    } else if (this.modoModal === 'editar') {
      const index = this.productos.findIndex(p => p.id === this.productoSeleccionado.id);
      if (index !== -1) this.productos[index] = { ...this.productoSeleccionado, ...producto };
    }
    this.mostrarModal = false;
  }

  desactivarProducto(producto: any) {
    producto.isActive = !producto.isActive;
  }
}
