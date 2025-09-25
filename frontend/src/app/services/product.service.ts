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
    this.products.push(new Producto(8,'Cielo','https://www.ajegroup.com/wp-content/uploads/2020/05/colombia-cielo.jpg','Bebida', 1.50))
    this.products.push(new Producto(9,'San Mateo','https://donangelo.pe/wp-content/uploads/2022/12/Agua-sin-gas-San-Mateo-600-ml-AGUA-SG-PET-600MLSAN-MATEO-1-554.png','Bebida', 2.00))
    this.products.push(new Producto(10,'San Luis','https://www.coca-cola.com/content/dam/onexp/pe/es/brands/san-luis/san_luis_sin_gas_750ml.jpg','Bebida', 2.00))
  
    //Sanguches
    this.products.push(new Producto(11,'Hamburguesa','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtUWoqMp8O5SwtyGrPOC9c6ouuwQYF0wP_LA&s','Sanguches', 7.00))
    this.products.push(new Producto(12,'Pan con pollo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFuQBNJyuYlwqGqrHmLy72M4nWJsewqEyytQ&s','Sanguches', 5.00))
    this.products.push(new Producto(13,'Triple','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpnGWHMSEGNFT-rwsQefAchTaso-mO-pK5iA&s','Sanguches', 5.50))
    this.products.push(new Producto(14,'Emapanda','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9KcUzNOn9d8aEH0fFaKlch9PF5bjmrnFRuQ&s','Sanguches', 4.50))
    this.products.push(new Producto(15,'Pan con chicharrón','https://comedera.com/wp-content/uploads/sites/9/2022/07/Pan-con-chicharron-limeno-shutterstock_1842217396.jpg','Sanguches', 8.00))
    this.products.push(new Producto(16,'Pan con pavo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9e0Vk2ttOorRyJRXXpHnAIGvKyHwyYkRJqg&s','Sanguches', 7.50))
    this.products.push(new Producto(17,'Pan con pollo a la brasa','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmGX9-R6fkttO6GB4iTcSJ97cLboPGlvuD-g&s','Sanguches', 7.00))
    this.products.push(new Producto(18,'Pan con lomo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSycsEPEzodti8pR0Mze2PRlKz9zPzCkARO6g&s','Sanguches', 8.00))
    this.products.push(new Producto(19,'Hamburguesa royal','https://www.bembos.com.pe/media/catalog/product/2/1/2146463856.png?optimize=medium&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700&format=jpeg','Sanguches', 14.00))
    this.products.push(new Producto(20,'Pan con salchicha huachana','https://blog.renaware.com/wp-content/uploads/2024/07/Salchicha-Hauchana-4.jpg','Sanguches', 6.50))

    //Comidas
    this.products.push(new Producto(21,'Arroz con Pollo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQiFPDdDnlynOO5URCASCtaTwH30qW6rFIug&s','Comidas', 15.00))
    this.products.push(new Producto(22,'Pollo a la brasa','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJgw-9zGlLPxKK4a4vi3uOXu2ohQHumEVVAQ&s','Comidas', 15.00))
    this.products.push(new Producto(23,'Estofado','https://www.recetasnestle.com.pe/sites/default/files/srh_recipes/02d772e59776b9b3566382bbf306f795.jpg','Comidas', 14.00))
    this.products.push(new Producto(24,'Carapulcra con Sopa Seca','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2KBur0lGQOF62tqQt62nmrHMv09WwxIQCw&s','Comidas', 20.00))
    this.products.push(new Producto(25,'Arroz con Pato','https://comedera.com/wp-content/uploads/sites/9/2022/05/Arroz-con-pato-peruano-shutterstock_1846729603.jpg','Comidas', 18.00))
    this.products.push(new Producto(26,'Tallarines Verdes con Bistec','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu5reYIM4-J0AtfGAkSUKo4aF37R9E2j87cg&s','Comidas', 17.50))
    this.products.push(new Producto(27,'Arroz Chaufa','https://origin.cronosmedia.glr.pe/large/2020/12/18/lg_5fdd5b4acf89f80dcc653f1d.jpg','Comidas', 15.00))
    this.products.push(new Producto(28,'Lomo Saltado','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNH_ruAciLeNiAlgeahhcLFLpU73XT8sXyKA&s','Comidas', 18.00))
    this.products.push(new Producto(29,'Pollo al Horno','https://acomer.pe/wp-content/uploads/2017/07/polloalhornothumb.jpg','Comidas', 16.00))
    this.products.push(new Producto(30,'Arroz Tapado','https://www.recetasnestle.com.pe/sites/default/files/srh_recipes/9be943a402dcf0ad061d1acf95f7c1f4.jpg','Comidas', 16.50))

    //Postres
    this.products.push(new Producto(31,'Torta de Chocolate','https://www.recetasnestle.com.ve/sites/default/files/srh_recipes/e2928ff551a360cdadb4e5a2528841b7.jpg','Postres', 5.00))
    this.products.push(new Producto(32,'Torta Tres Leches','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSifoWLBBT0VdtLuzgdV9VqB5x5C6fXPePow&s','Postres', 5.00))
    this.products.push(new Producto(33,'Selva Negra','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqWcWpz0sWs8T0qhljZ4uke8PpjCYckpbMlw&s','Postres', 4.50))
    this.products.push(new Producto(34,'Suspiro a la Limeña','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDyHzCDbjQbDKauQeRnMnBZYhOml4FDaTzwg&s','Postres', 7.50))
    this.products.push(new Producto(35,'Alfajores','https://www.nestleprofessional-latam.com/sites/default/files/styles/np_recipe_detail/public/2023-08/ALFAJOR.jpg?itok=SwjKp6E-','Postres', 3.00))
    this.products.push(new Producto(36,'Picarones','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStgPlFhQfekckoeEgRV39Uv5K2DxOyUVlTxg&s','Postres', 4.50))
    this.products.push(new Producto(37,'Pie de Manzana','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-dXRHg6Mk2y0MKSmhUGWeGTOF37DSFG2nWg&s','Postres', 5.00))
    this.products.push(new Producto(38,'Pie de Limón','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdB5sUxghgFojqXtarttC86YsS0bbPUi93Mg&s','Postres', 5.00))
    this.products.push(new Producto(39,'Tartaleta','https://comedera.com/wp-content/uploads/sites/9/2023/02/Tartaleta-de-fresa-shutterstock_1084608647.jpg','Postres', 4.50))
    this.products.push(new Producto(40,'Crepe','https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2024/05/crepas-cheesecake-fresas.jpg','Postres', 4.00))

    //Snacks
    this.products.push(new Producto(41,'Papas Lays','https://plazavea.vteximg.com.br/arquivos/ids/31462882-450-450/20355479.jpg?v=638852261572170000','Snacks', 2.50))
    this.products.push(new Producto(42,'Pringles','https://vegaperu.vtexassets.com/arquivos/ids/167258-800-450?v=638622119944100000&width=800&height=450&aspect=true','Snacks', 9.00))
    this.products.push(new Producto(43,'Oreo','https://mercury.vtexassets.com/arquivos/ids/17799142-800-800?v=638548731829700000&width=800&height=800&aspect=true','Snacks', 3.00))
    this.products.push(new Producto(44,'Cheetos','https://media.falabella.com/tottusPE/43492233_1/w=1500,h=1500,fit=pad','Snacks', 2.50))
    this.products.push(new Producto(45,'Kit Kat','https://vegastoreperu.com/wp-content/uploads/2024/04/Kit-Kat-41.5g.jpg','Snacks', 3.00))
    this.products.push(new Producto(46,'M&Ms','https://metroio.vtexassets.com/arquivos/ids/522837-800-auto?v=638495989058530000&width=800&height=auto&aspect=true','Snacks', 4.50))
    this.products.push(new Producto(47,'Snickers','https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/2019-01-28_19_55_14_A_Snickers_bar_with_the_wrapper_still_intact_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg/1200px-2019-01-28_19_55_14_A_Snickers_bar_with_the_wrapper_still_intact_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg','Snacks', 3.00))
    this.products.push(new Producto(48,'Doritos','https://media.falabella.com/tottusPE/43075025_1/w=1500,h=1500,fit=pad','Snacks', 2.00))
    this.products.push(new Producto(49,'Chifles','https://media.falabella.com/tottusPE/42464583_1/w=1500,h=1500,fit=pad','Snacks', 2.00))
    this.products.push(new Producto(50,'Yogur con Granola','https://metroio.vtexassets.com/arquivos/ids/383409/Yogurt-Griego-con-Ar-ndano-Ch-a-y-Granola-Tigo-Premium-175g-1-200978809.jpg?v=638180594867030000','Snacks', 4.00))

  }

  obtenerProductos(): Producto[]{
    return this.products;
  }
}
