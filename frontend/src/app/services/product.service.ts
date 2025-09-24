import { Injectable } from '@angular/core';
import { Producto } from '../models/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Producto[] = [];

  constructor() { 
    this.crearProductosFicticios();
  }

  private crearProductosFicticios(){
    //Bebidas
    this.products.push(new Producto(1,'Coca-Cola','https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg/960px-15-09-26-RalfR-WLC-0098_-_Coca-Cola_glass_bottle_%28Germany%29.jpg','Bebida', 2.50))
    this.products.push(new Producto(2,'Inca Kola','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFQw6OtkWG2_OxNLcDtTW7hoM2zyj1LVuuFw&s','Bebida', 2.50))
    this.products.push(new Producto(3,'Pepsi','https://dojiw2m9tvv09.cloudfront.net/53648/product/sintitulo8148.png','Bebida', 2.00))
    this.products.push(new Producto(4,'Cifrut','https://www.ajegroup.com/wp-content/uploads/2020/05/peru-cifrut-1.jpg','Bebida', 1.80))
    this.products.push(new Producto(5,'Café Americano','https://cdn.recetasderechupete.com/wp-content/uploads/2023/11/Cafe-americano-portada.jpg','Bebida', 3.00))
    this.products.push(new Producto(6,'Infusión','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsA05qwMWCOSAXOsi_TRGziZSN9WVHNChq9g&s','Bebida', 2.00))
    this.products.push(new Producto(7,'Fanta','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXcu5Imk8PQ5gWUrJeQ0GS_AETHNM85HzbHQ&s','Bebida', 2.00))
    this.products.push(new Producto(8,'Cielo','https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ajegroup.com%2Fmarca%2Fcielo%2F&psig=AOvVaw0DdU_aproe1qQvDguu_sjD&ust=1758752943265000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLjCl7X3748DFQAAAAAdAAAAABAE','Bebida', 1.50))
    this.products.push(new Producto(9,'San Mateo','https://donangelo.pe/wp-content/uploads/2022/12/Agua-sin-gas-San-Mateo-600-ml-AGUA-SG-PET-600MLSAN-MATEO-1-554.png','Bebida', 2.00))
    this.products.push(new Producto(10,'San Luis','https://www.coca-cola.com/content/dam/onexp/pe/es/brands/san-luis/san_luis_sin_gas_750ml.jpg','Bebida', 2.00))
  
    //Sanguches

    //Comidas

    //Postres

    //Snacks


  }

  obtenerProductos(): Producto[]{
    return this.products;
  }
}
