import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, pluck } from 'rxjs';
import { Category } from '../models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoryList$: BehaviorSubject<CategoryList>;
  categories : Category[] = [];

  constructor(private http: HttpClient) {
    this.categoryList$ = new BehaviorSubject<CategoryList>({ id: 0, categories: []});
    this.getCategoryList();
  }

  getCategoryList() {
    this.http.get<CategoryList>('/assets/category.json').subscribe((data) => {
      this.setCategoryList(data);
    },
    () => {
      console.error('Shopping cart data could not be loaded.');
    });
  }

  setCategoryList(data: CategoryList) {
    this.categoryList$.next(data);
  }

  public getCategories(): Observable<Category[]> {
    return this.categoryList$.pipe( pluck('categories'));
    // return this.http.get<Category[]>(this.usersUrl);
  }

  public getAll() { 
    return this.getCategories();
  }

}


export interface CategoryList {
  id: number;
  categories : Category[];
}
