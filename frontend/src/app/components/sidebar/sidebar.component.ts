import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() selectedCategory: string = '';  // Recibir la categoría seleccionada
  @Output() categorySelected = new EventEmitter<string>(); // Evento para emitir la categoría seleccionada
  categories: string[] = ['Bebida', 'Sanguches', 'Comidas', 'Postres', 'Snacks'];

  selectCategory(category: string): void {
    this.categorySelected.emit(category); // Emitir la categoría seleccionada
  }

}
