import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  totalPrice : number = 0;
  count$: Observable<number> | undefined;
  subTotal$: Observable<number> | undefined;
  
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    // this.items$ = this.shoppingCartService.getItems();
    this.count$ = this.shoppingCartService.getCount();
    this.subTotal$ = this.shoppingCartService.getSubTotal();
  }
  
}
