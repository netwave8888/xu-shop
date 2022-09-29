import { ShoppingCartItem } from "./shopping-cart-item";

export interface ShoppingCart {
  id: string;
  items: ShoppingCartItem[];
  subTotal: number;
}
