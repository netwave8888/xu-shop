import { Product } from './product';

export interface ShoppingCartItem {
  key: string;
  title: string;
  category: string;
  imageUrl: string;
  price: number; 
  quantity: number; 

//   constructor(init?: Partial<ShoppingCartItem>) {
//     Object.assign(this, init);
//   }

//   get totalPrice() { return this.price * this.quantity; }
}