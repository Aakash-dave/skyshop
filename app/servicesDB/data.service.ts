import { Injectable } from '@angular/core';
import { url_db } from './url-config';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class DataService {

  constructor(
    private http : HttpClient
  ) {}

  getProducts()
  {
    let url = url_db.products;
    return this.http.get(url);
  }


}
