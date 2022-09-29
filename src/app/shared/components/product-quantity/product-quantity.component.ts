import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart; 
  quantity$ : Observable<number>;
  

  constructor(private cartService: ShoppingCartService) { 
    console.log("in quantity cons: " + this.product);
  }
  ngOnInit(): void {
    console.log("in quantity: " + this.product);
    this.quantity$ = this.cartService.getItemQuantity(this.product?.key);
  }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }


}