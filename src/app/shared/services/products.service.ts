import { Injectable } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { of } from 'rxjs'
import { Product } from '../models/product';

@Injectable()
export class ProductsService {
  productList : Product[]= [
    {
      "key": "abc",
      "title": "Tomato Bread",
      "price": 9.99,
      "category": "Bread",
      "imageUrl": './assets/tomatoBread.jpg'
    }, 
  
    {
      "key": "def",
      "title": "Mango",
      "price": 1.99,
      "category": "fruit",
      "imageUrl": './assets/Mango.jpg'
    }
  ]

  constructor() { }

  getAll() {
    return of(
      [
        {
          "key": "b1",
          "title": "Tomato Bread",
          "price": 9.99,
          "category": "bread",
          "imageUrl": './assets/tomatoBread.jpg'
        }, 
        {
          "key": "f1",
          "title": "Mango",
          "price": 1.99,
          "category": "fruits",
          "imageUrl": './assets/Mango.jpg'
        }
      ],
    );
  }

  get(productId: string): Product {
    let i = 0;
    while ( i < this.productList.length) {
      if ( this.productList[i].key.localeCompare(productId) === 0 ) {
        console.log( "product: " + this.productList[i].key);
        return this.productList[i];
      }  else {
        console.log("product service in else");
      }
    }
    return this.productList[0];
  }
}
