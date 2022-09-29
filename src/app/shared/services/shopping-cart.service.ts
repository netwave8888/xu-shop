import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShoppingCart }  from '../models/shopping-cart';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart$: BehaviorSubject<ShoppingCart>;

  constructor(private httpClient: HttpClient ) { 
    this.shoppingCart$ = new BehaviorSubject<ShoppingCart>({ id : '', items: [], subTotal: 0 });

    // Load shopping cart data
    this.getShoppingCart(); 
  }

  private getShoppingCart() { // set up shopping cart json array then emit via shoppingCart$
    this.httpClient.get<ShoppingCart>('/assets/shopping-cart.json').subscribe({
        next: (shoppingCart) => { this.setShoppingCart(shoppingCart)},
        error: (error) => {console.log(error); },
        complete: () => { console.log("Complete!")}
    });
  }

  private setShoppingCart(shoppingCart: ShoppingCart) { // emit shoppingCart to the other
                                                        // subscribers
    this.shoppingCart$.next(shoppingCart);
  }

  getItems(): Observable<ShoppingCartItem[]> {
    console.log("getSubTotalQ: " + this.shoppingCart$);
    return this.shoppingCart$.pipe(
        map( (shoppingCart) => shoppingCart.items)
    );
  }

  getItemQuantity(key: string):Observable<number> {
    
    return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const item = shoppingCart?.items.find(x=>x.key===key);
        return item?.quantity;
      })
    )
  }

  getSubTotal(): Observable<number> {
    console.log("getSubTotal1: " + this.getItems());
      return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const subTotal = shoppingCart?.items
          .map((item) => item.quantity * item.price)
          .reduce((p, c) => p + c, 0);
        return subTotal;
      })
    );
  }

  getCount(): Observable<number> {
    // const cart = { ... this.shoppingCart$.value};
    // console.log(cart);
    return this.shoppingCart$.pipe(
      map((shoppingCart) => {
        const count = shoppingCart.items
          .map((item) => item.quantity)
          .reduce((p, c) => p + c, 0);
        return count;
      })
    );
  }

  // shopping cart operations
  async addToCart(product: Product) { 
    // this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    // this.updateItem(product, -1);
  }


  private getItem(cartId: string, productId: string) {
    // return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async clearCart() { 
    // let cartId = await this.getOrCreateCartId();
    // this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  // private async updateItem(product: Product, change: number) {
  //   let cartId = await this.getOrCreateCartId();
  //   let item$ = this.getItem(cartId, product.$key);
  //   item$.take(1).subscribe(item => {
  //     let quantity = (item.quantity || 0) + change;
  //     if (quantity === 0) item$.remove();
  //     else item$.update({ 
  //       title: product.title,
  //       imageUrl: product.imageUrl,
  //       price: product.price,
  //       quantity: quantity
  //     });
  //   });
  // }
  


}
