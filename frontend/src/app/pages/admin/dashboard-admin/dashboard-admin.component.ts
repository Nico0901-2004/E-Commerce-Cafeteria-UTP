import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  totalProductos = 32;
  pedidosHoy = 15;
  ingresosMes = 2500;
  totalUsuarios = 120;

  // 🔹 Productos simulados
  productos = [
    { id: 1, nombre: 'Café Expreso', stock: 3 },
    { id: 2, nombre: 'Cappuccino', stock: 5 },
    { id: 3, nombre: 'Croissant', stock: 2 },
    { id: 4, nombre: 'Té Verde', stock: 10 },
    { id: 5, nombre: 'Moka', stock: 1 },
    { id: 6, nombre: 'Latte', stock: 7 },
  ];

  // 🔹 Lista de productos con bajo stock
  productosBajoStock: any[] = [];

  ngOnInit(): void {
    // Filtra los productos con stock bajo (≤ 5)
    this.productosBajoStock = this.productos.filter(p => p.stock <= 5);

    // Gráficos
    this.generarGraficoVentas();
    this.generarGraficoIngresos();
  }

  generarGraficoVentas() {
    const ctx = document.getElementById('ventasPorDiaChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
        datasets: [{
          label: 'Ventas por día',
          data: [12, 19, 7, 14, 20, 25, 18],
          backgroundColor: '#007bff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

  generarGraficoIngresos() {
    const ctx = document.getElementById('ingresosChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [{
          label: 'Ingresos (S/)',
          data: [500, 800, 600, 1100],
          borderColor: '#28a745',
          backgroundColor: 'rgba(40,167,69,0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}
