import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.css']
})
export class ProductFormModalComponent implements OnInit {
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() productoSeleccionado: any = null;
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  producto = {
    nombre: '',
    precio: null,
    stock: null,
    descripcion: ''
  };

  ngOnInit(): void {
    if (this.modo === 'editar' && this.productoSeleccionado) {
      this.producto = { ...this.productoSeleccionado };
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  guardarProducto() {
    if (!this.producto.nombre || this.producto.precio == null || this.producto.stock == null) {
      alert('Por favor completa los campos obligatorios');
      return;
    }
    this.guardar.emit(this.producto);
  }
}
