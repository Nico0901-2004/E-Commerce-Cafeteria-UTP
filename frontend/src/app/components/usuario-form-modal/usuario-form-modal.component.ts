import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-form-modal.component.html',
  styleUrls: ['./usuario-form-modal.component.css']
})
export class UsuarioFormModalComponent implements OnInit {
  /** Título dinámico del modal */
  @Input() titulo: string = 'Registrar Usuario';

  /** Datos del usuario que se edita (si hay) */
  @Input() usuario: any = null;

  /** Eventos */
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<any>();

  /** Datos temporales para el formulario */
  usuarioTemp: any = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  ngOnInit() {
    // Si se recibe un usuario, clonamos los datos
    if (this.usuario) {
      this.usuarioTemp = { ...this.usuario };
      this.titulo = 'Editar Usuario';
    }
  }

  cerrarModal() {
    this.cerrar.emit();
  }

  guardarCambios() {
    this.guardar.emit(this.usuarioTemp);
  }
}
