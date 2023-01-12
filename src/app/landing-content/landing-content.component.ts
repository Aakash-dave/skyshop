import { Component, ElementRef, HostListener, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';
import { LogonComponent } from '../auth/logon/logon.component'; // dialog page
import { MatDialog } from '@angular/material/dialog';
// import { MatDrawer } from '@angular/material/sidenav';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../servicesDB/data.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
// import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css'],
})

export class LandingContentComponent implements OnInit {

  // @ViewChild('sidenav', { static: true }) public sidenav!: MatDrawer;

  //snackbar
  // horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  // verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  allProducts!: Observable<any>;
  loginAsked = false;

  //add to cart
  addtoCartClicked: boolean = false;
  cartItemIds: number[] = [];
  itemsInCart: number = 0;

  //rating related variables
  showRatingbtn: boolean = false;
  showRatingOnItem!: number;

  ratingEmoji: { [key: number]: string } = {
    1: 'sentiment_dissatisfied',
    2: 'sentiment_neutral',
    3: 'mood',
    4: 'sentiment_satisfied',
    5: 'sentiment_very_satisfied',
  }

  cartEmoji: { [key: number]: string } = {
    0: 'add_shopping_cart',
    1: 'shopping_cart_checkout'
  }

  constructor(
    private _dialogRef: MatDialog,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _dataService: DataService,
    private _renderer2: Renderer2,
    private _snackBar: MatSnackBar,
    private _uiService: ViewInteractionService
  ) {
    this._dataService.itemsIncart_sub.subscribe({
      next: (req) => {
        this.itemsInCart = req;
      }
    });

    this._dataService.cartItemId_sub.subscribe({
      next: (req) => {
        this.cartItemIds = req;
      }
    });
  }

  @HostListener('webkitAnimationEnd') fun() {
    this.showRatingbtn = false;
    this.showRatingOnItem = 0;
  } // when animation ends reset button

  ngOnInit(): void {

    // this._uiService.setSidenav(this.sidenav);

    this._activatedRoute.params.subscribe(path => {
      // console.log(path);

      const existingUser = localStorage.getItem('user_name');

      if (!path['cat'] && existingUser == null) {
        // Dialog setup
        this._dialogRef.open(LogonComponent, {
          width: '35%',
          height: '80%',
          disableClose: true,
        });
      }

      if (path['cat']) {
        this.openCategory();
      }


    })

    //this._products_ = this.dataService_.getProducts(); // async used
    const from_Strore = this._dataService.allProducts_;
    this.allProducts = from_Strore;

  }// ngOnInit

  openProduct(id: number, cat: string) {
    // this.route_.navigate(['product'], {queryParams: {pid: id, cat:cat } });
    this._router.navigate(['product', id, cat]);
  }

  openCategory() {
    let categoryName: string = '';
    this._activatedRoute.paramMap.subscribe((params) => {
      categoryName = params.get('cat') || '';
    });

    this._dataService.openCategory(categoryName).subscribe({
      next: (req: any) => {
        // console.log(req);
        this.allProducts = of(req);
      },
      complete: () => {
        this._uiService.closeSideNav()
      }
    });

  }

  showRating(id: number) {
    this.showRatingbtn = true;
    this.showRatingOnItem = id;
  }

  addToCart(itemId: number) {
    this.addtoCartClicked = true;

    if (!this.cartItemIds.includes(itemId)) {

      this.cartItemIds.push(itemId);
      this._dataService.cartItemId_sub.next(this.cartItemIds);

      this._uiService.openSnackBar('Added to cart', 'Yay!');
    }
    else {
      this._uiService.openSnackBar('Already in your cart', 'Okay!');
    }

    this.itemsInCart = this.cartItemIds.length;
    this._dataService.itemsIncart_sub.next(this.itemsInCart);
  }

  alreadyInCart(itemId: number) {
    return this.cartEmoji[Number(this.cartItemIds.includes(itemId))];
  }

}