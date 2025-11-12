import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioFormModalComponent } from '../../components/usuario-form-modal/usuario-form-modal.component';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, UsuarioFormModalComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  usuario = {
    nombre: 'Juan Pérez',
    apellido: 'Pérez',
    username: 'juanperez',
    email: 'juanperez@example.com',
    telefono: '+51 987 654 321',
    direccion: 'Av. Los Cafetos 123',
    fechaRegistro: new Date('2024-10-15'),
    rol: 'Usuario registrado',
    foto: '' // o ruta personalizada
  };

  mostrarModal = false;

  /** Abre el modal con los datos del usuario cargados */
  editarPerfil() {
    this.mostrarModal = true;
  }

  /** Cierra el modal */
  cerrarModal() {
    this.mostrarModal = false;
  }

  /** Guarda los cambios del modal */
  guardarUsuario(usuarioEditado: any) {
    this.usuario = { ...this.usuario, ...usuarioEditado };
    console.log('Datos actualizados:', this.usuario);
    this.mostrarModal = false;
  }

  cerrarSesion() {
    console.log('Cerrar sesión');
  }
}


