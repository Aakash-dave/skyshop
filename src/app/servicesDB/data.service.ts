import { Injectable } from '@angular/core';
import { url_db } from './url-config';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DataService {
  private subject = new BehaviorSubject<object>([]);
  allProducts_: Observable<any> = this.subject.asObservable();

  // in cart
  public itemsIncart_sub = new BehaviorSubject<number>(0);
  public cartItemId_sub = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) { }

  // loaded in app.components
  init() {
    let url = url_db.products;
    this.http.get(url).subscribe((response) => this.subject.next(response));
  }

  getInterestedProducts(cat: string) {
    let url = url_db.interestedProducts;
    return this.http.get(`${url}${cat}`);
  }

  getSimilarProducts(cat: string) {
    let url = url_db.similarProducts;
    return this.http.get(`${url}${cat}`);
  }

  openCategory(cat: string) {
    let url = url_db.openCategory;
    return this.http.get(`${url}${cat}`);
  }

  getcartItems(reqBody: object) {
    let url = url_db.cartItems;
    return this.http.post(`${url}`, reqBody);
  }

}
