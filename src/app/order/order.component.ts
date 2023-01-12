import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../servicesDB/data.service';

export interface IOrderDetail {
  id: number,
  name: string,
  price: string,
  category: string,
  url1: string,
  quantity?: number
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})

export class OrderComponent implements OnInit {

  cartIds!: number[];
  cartProducts: IOrderDetail[] = [];
  cartQuantity = new Map();

  cartPrice: number = 0;
  deliveryCharge: number = 0;
  discount: number = 5;
  cartTotal: number = 0;

  userDetail: string[] = ['Please Login', ''];

  constructor(private _dataService: DataService,
    private _router: Router) {
    this._dataService.cartItemId_sub.subscribe({
      next: (req) => {
        this.cartIds = req;
      }
    });
  }

  ngOnInit(): void {

    // this.cartIds = [1, 2, 3, 4];  // temp

    this._dataService.getcartItems(this.cartIds).subscribe({
      next: (req: any) => {
        this.cartProducts = req;
        // console.log(this.cartProducts);
      },
      complete: () => {
        this.calTotalPrice();
        this.recalTotal();
      }
    });

    //
    this.cartIds.forEach(ele => {
      this.cartQuantity.set(ele, 1);
    })

    // user details from local storage
    if (localStorage.getItem('user_name')) {
      this._dataService.user_name.subscribe({
        next: (req: any) => {
          this.userDetail = req;
        }
      });
    }


  }

  increment(item_id: number, price: string) {
    if (this.cartQuantity.get(item_id) < 10) {
      this.cartQuantity.set(item_id, this.cartQuantity.get(item_id) + 1);
      this.cartPrice += parseInt(price);
    }
    this.recalTotal();
  }

  decrement(item_id: number, price: string) {
    if (this.cartQuantity.get(item_id) > 1) {
      this.cartQuantity.set(item_id, this.cartQuantity.get(item_id) - 1);
      this.cartPrice -= parseInt(price);
    }
    this.recalTotal();
  }


  calTotalPrice() {
    this.cartPrice = this.cartProducts.reduce((accumulator: number, ele: any) =>
      (+accumulator + parseInt(ele.price)) * (1), 0);
  }

  recalTotal() {
    this.cartTotal = this.cartPrice - ((this.cartPrice * this.discount) / 100) - this.deliveryCharge;
  }

  removeCartItem(idToRemove: number) {
    this.cartProducts = this.cartProducts.filter((ele: any) => ele.id !== idToRemove);
    this.cartIds = this.cartIds.filter((ele: any) => ele.id !== idToRemove);
    this._dataService.cartItemId_sub.next(this.cartIds);
    this.calTotalPrice();
    this.recalTotal();
  }

  openProduct(id: number, cat: string) {
    this._router.navigate(['product', id, cat]);
  }

}
