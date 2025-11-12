import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Pedido {
  id: number;
  productos: string[];
  total: number;
  estado: string;
  fecha: string;
}

@Component({
  selector: 'app-historial-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.css']
})
export class HistorialPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosPaginados: Pedido[] = [];
  paginaActual = 1;
  pedidosPorPagina = 5;
  totalPaginas = 1;

  ngOnInit() {
    this.cargarPedidosSimulados();
    this.actualizarPaginacion();
  }

  // 🔹 Simula pedidos distintos según el usuario logueado
  cargarPedidosSimulados() {
    const rol = localStorage.getItem('rol');
    const usuario = rol === 'usuario' ? 'user@gmail.com' : 'admin@gmail.com';

    this.pedidos = [
      { id: 1, productos: ['Café Americano', 'Croissant'], total: 10.5, estado: 'Entregado', fecha: '2025-11-10' },
      { id: 2, productos: ['Capuccino'], total: 6.0, estado: 'Listo', fecha: '2025-11-11' },
      { id: 3, productos: ['Tostadas', 'Café Latte'], total: 12.0, estado: 'Entregado', fecha: '2025-11-09' },
      { id: 4, productos: ['Chocolate Caliente'], total: 8.0, estado: 'Pendiente', fecha: '2025-11-08' },
    ];

    console.log(`Pedidos simulados cargados para: ${usuario}`);
  }

  // 🔹 Actualiza la lista visible según la página actual
  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.pedidosPorPagina;
    const fin = inicio + this.pedidosPorPagina;
    this.totalPaginas = Math.ceil(this.pedidos.length / this.pedidosPorPagina);
    this.pedidosPaginados = this.pedidos.slice(inicio, fin);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }
}
