import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicesDB/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {

  cartIds!: number[];

  constructor(private _dataService: DataService) {
    this._dataService.cartItemId_sub.subscribe({
      next: (req) => {
        this.cartIds = req;
      }
    });
  }

  ngOnInit(): void {

    this._dataService.getcartItems(this.cartIds).subscribe({
      next: (req) => {
        console.log(req);
      },
    });

  }
}
