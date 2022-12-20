import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicesDB/data.service';

export interface IOrderDetail {
  id: number,
  name: string,
  price: string,
  category: string,
  url1: string,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {

  cartIds!: number[];
  cartProducts: IOrderDetail[] = [];

  constructor(private _dataService: DataService) {
    this._dataService.cartItemId_sub.subscribe({
      next: (req) => {
        this.cartIds = req;
      }
    });
  }

  ngOnInit(): void {

    this.cartIds = [1,2,3,4];

    this._dataService.getcartItems(this.cartIds).subscribe({
      next: (req:any) => {
        this.cartProducts = req;
        console.log(this.cartProducts);
      },
    });

  }
}
