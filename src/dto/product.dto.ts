import { IProduct } from 'src/types/product';
 
 export interface CreateProductDTO {
  price: IProduct['price'];
  description: IProduct['description'];
  title: IProduct['title'];
  image?: IProduct['image'];
}
export type UpdateProductDTO = Partial<CreateProductDTO>  ;  
// "Partial" means this type id evantually is going to a CreateProductDTO 

// this is the other form of "Partial<CreateProductDTO>"
// export interface UpdateProductDTO {
//   price?: IProduct['price'];
//   description?: IProduct['description'];
//   title?: IProduct['title'];
//   image?: IProduct['image'];
// }
