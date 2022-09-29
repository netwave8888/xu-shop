import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items$: Observable<ShoppingCartItem[]> | undefined;
  totalPrice : number = 0;
  count$: Observable<number> | undefined;
  subTotal$: Observable<number> | undefined;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.items$ = this.shoppingCartService.getItems();
    this.count$ = this.shoppingCartService.getCount();
    this.subTotal$ = this.shoppingCartService.getSubTotal();
    // console.log();
  }

  clearCart() { 
    this.shoppingCartService.clearCart();
  }

}
