export class Producto {
  id: number;
  descripcion: string;
  imagen: string;
  categoria: string;
  precio: number;

  constructor(id: number, descripcion: string, imagen: string, categoria:string, precio: number) {
    this.id = id;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.categoria = categoria;
    this.precio = precio;
  }
}