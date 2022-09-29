import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart; 
  quantity: number = 0;

  constructor(private cartService: ShoppingCartService) { 
    // this.cartService.getItemQuantity(this.product.key).subscribe(
    //   (data) => {this.quantity = data, console.log(this.quantity)}
    // );
  }
  ngOnInit(): void {
    this.cartService.getItemQuantity(this.product.key).subscribe(
      (data) => {this.quantity = data, console.log(this.quantity)}
    );
  }

  


  addToCart() {
    this.cartService.addToCart(this.product);

    
  }
}
