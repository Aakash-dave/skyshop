import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../servicesDB/data.service';
import { LogonComponent } from '../auth/logon/logon.component'; // dialog page
import { MatDialog } from '@angular/material/dialog';
import { ThankyouComponent } from '../thankyou/thankyou.component';

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

export class OrderComponent implements OnInit, AfterViewInit {

  cartIds!: number[];
  cartProducts: IOrderDetail[] = [];
  cartQuantity = new Map();
  itemsInCart!: number;

  cartPrice: number = 0;
  deliveryCharge: number = 0;
  discount: number = 5;
  cartTotal: number = 0;
  deliveryDays: number = 0;

  userDetail: string[] = ['Please Login', ''];

  constructor(
    private _dataService: DataService,
    private _router: Router,
    private _dialogRef: MatDialog) {
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

    this.getLoggedInUser();

  }

  getLoggedInUser() {
    // user details from local storage
    if (localStorage.getItem('user_name')) {
      this._dataService.user_name.subscribe({
        next: (req: any) => {
          this.userDetail = req;
        }
      });
    }
  }

  isloggnedIn() {
    return localStorage.getItem('user_name');
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
    this.cartIds = this.cartIds.filter((ele: any) => ele != idToRemove);
    this._dataService.cartItemId_sub.next(this.cartIds);

    let items = this.getCartSize() - 1;
    this._dataService.itemsIncart_sub.next(items);

    this.calTotalPrice();
    this.recalTotal();
  }

  openProduct(id: number, cat: string) {
    this._router.navigate(['product', id, cat]);
  }

  getCartSize(): number {
    this._dataService.itemsIncart_sub.subscribe({
      next: (req) => {
        this.itemsInCart = req;
      }
    });
    return this.itemsInCart;
  }

  logon() {
    const dialog = this._dialogRef.open(LogonComponent, {
      width: '35%',
      height: '80%',
      disableClose: true,
    });

    dialog.afterClosed().subscribe({
      next: () => this.getLoggedInUser(),
    });

  }

  placeOrder() {
    const dialog = this._dialogRef.open(ThankyouComponent, {
    });

    dialog.afterClosed().subscribe({
      next: () => {
        this._dataService.itemsIncart_sub.next(0);
        this._dataService.cartItemId_sub.next([]);
        this._router.navigate(['/']);
      }
    });
  }

  ngAfterViewInit() {
    this.deliveryDays = Math.floor((Math.random() * 10) + 1);
  }


}
