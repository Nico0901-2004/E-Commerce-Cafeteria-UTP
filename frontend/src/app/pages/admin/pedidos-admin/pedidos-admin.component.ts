import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: number;
  idUser: number;
  estado: string;
  fechaCreacion: string;
}

@Component({
  selector: 'app-pedidos-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent {
  pedidos: Pedido[] = [
    { id: 1, idUser: 101, estado: 'Listo', fechaCreacion: '2025-10-01' },
    { id: 2, idUser: 102, estado: 'Entregado', fechaCreacion: '2025-10-02' },
    { id: 3, idUser: 103, estado: 'Listo', fechaCreacion: '2025-10-03' },
    { id: 4, idUser: 104, estado: 'Entregado', fechaCreacion: '2025-10-04' },
    { id: 5, idUser: 105, estado: 'Listo', fechaCreacion: '2025-10-05' },
    { id: 6, idUser: 106, estado: 'Entregado', fechaCreacion: '2025-10-06' },
    { id: 7, idUser: 107, estado: 'Listo', fechaCreacion: '2025-10-07' },
    { id: 8, idUser: 108, estado: 'Entregado', fechaCreacion: '2025-10-08' },
    { id: 9, idUser: 109, estado: 'Listo', fechaCreacion: '2025-10-09' },
    { id: 10, idUser: 110, estado: 'Entregado', fechaCreacion: '2025-10-10' },
  ];

  // Paginación
  paginaActual = 1;
  itemsPorPagina = 5;

  get totalPaginas(): number {
    return Math.ceil(this.pedidos.length / this.itemsPorPagina);
  }

  get pedidosPaginados(): Pedido[] {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    return this.pedidos.slice(inicio, inicio + this.itemsPorPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }

  editarPedido(pedido: Pedido) {
    alert(`Editar pedido con ID: ${pedido.id}`);
  }

  eliminarPedido(pedido: Pedido) {
    const confirmacion = confirm(`¿Seguro que deseas eliminar el pedido con ID ${pedido.id}?`);
    if (confirmacion) {
      this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
      if (this.paginaActual > this.totalPaginas) {
        this.paginaActual = this.totalPaginas;
      }
    }
  }
}
