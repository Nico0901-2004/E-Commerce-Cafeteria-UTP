import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './usuarios-admin.component.html',
  styleUrl: './usuarios-admin.component.css'
})
export class UsuariosAdminComponent {
  usuarios = [
    { id: 1, nombre: 'Ana Torres', email: 'ana.torres@example.com', telefono: '987654321', ultimoAcceso: new Date('2025-10-29T08:30:00') },
    { id: 2, nombre: 'Carlos Gómez', email: 'carlos.gomez@example.com', telefono: '912345678', ultimoAcceso: new Date('2025-10-30T10:45:00') },
    { id: 3, nombre: 'Lucía Ramos', email: 'lucia.ramos@example.com', telefono: '999888777', ultimoAcceso: new Date('2025-11-01T14:15:00') },
    { id: 4, nombre: 'Diego Fernández', email: 'diego.fernandez@example.com', telefono: '987321654', ultimoAcceso: new Date('2025-10-31T12:00:00') },
    { id: 5, nombre: 'María López', email: 'maria.lopez@example.com', telefono: '900111222', ultimoAcceso: new Date('2025-10-28T09:10:00') },
    { id: 6, nombre: 'Juan Pérez', email: 'juan.perez@example.com', telefono: '944333555', ultimoAcceso: new Date('2025-10-27T15:25:00') },
    { id: 7, nombre: 'Sofía García', email: 'sofia.garcia@example.com', telefono: '933666999', ultimoAcceso: new Date('2025-11-01T19:40:00') },
    { id: 8, nombre: 'Andrés Silva', email: 'andres.silva@example.com', telefono: '988777666', ultimoAcceso: new Date('2025-10-26T07:50:00') },
    { id: 9, nombre: 'Laura Díaz', email: 'laura.diaz@example.com', telefono: '977888555', ultimoAcceso: new Date('2025-10-25T18:05:00') },
    { id: 10, nombre: 'Pedro Castillo', email: 'pedro.castillo@example.com', telefono: '922333444', ultimoAcceso: new Date('2025-11-02T11:20:00') }
  ];

  // ===== PAGINACIÓN =====
  paginaActual = 1;
  usuariosPorPagina = 5;

  get totalPaginas() {
    return Math.ceil(this.usuarios.length / this.usuariosPorPagina);
  }

  get usuariosPaginados() {
    const inicio = (this.paginaActual - 1) * this.usuariosPorPagina;
    return this.usuarios.slice(inicio, inicio + this.usuariosPorPagina);
  }

  paginaAnterior() {
    if (this.paginaActual > 1) this.paginaActual--;
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) this.paginaActual++;
  }

  // ===== ACCIONES =====
  editarUsuario(usuario: any) {
    console.log('Editar usuario:', usuario);
    alert(`Editar usuario: ${usuario.nombre}`);
  }

  eliminarUsuario(usuario: any) {
    const confirmar = confirm(`¿Seguro que deseas eliminar a ${usuario.nombre}?`);
    if (confirmar) {
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
    }
  }
}
