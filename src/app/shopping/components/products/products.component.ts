import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductsService } from 'src/app/shared/services/products.service';
import { switchMap } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  filteredProducts: Product[];
  // categories$;
  category : string;
  subscription : Subscription;
  cart$: Observable<ShoppingCart>;

  constructor(
    route : ActivatedRoute,
    private productService: ProductsService, 
    private shoppingCartService: ShoppingCartService) { 
    this.subscription=productService.getAll().subscribe(
      data => this.products = data,
    );

    route.queryParamMap.subscribe( params => {
       this.category = params.get('category');
       this.filteredProducts = this.category ? 
      this.products.filter(p=> p.category.toLowerCase()==this.category.toLowerCase())
      :this.products;
    });
  }

  // private populateProducts() { 
  //   this.productService
  //     .getAll().
  //     .switchMap(products => {
  //       this.products = products;
  //       return this.route.queryParamMap;
  //     })
  //     .subscribe(params => {
  //       this.category = params.get('category');
  //       this.applyFilter();      
  //     });
  // }


  private applyFilter() { 
    this.filteredProducts = (this.category) ? 
    this.products.filter(p => p.category === this.category) : 
    this.products;
  }

  async ngOnInit(): Promise<void> {
    this.cart$ = await this.shoppingCartService.shoppingCart$;
  }

}
