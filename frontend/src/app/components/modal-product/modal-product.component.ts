import { Component, Input } from '@angular/core';
import { Producto } from '../../models/Product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css']
})
export class ModalProductComponent {
  @Input() product!: Producto | null;
}