import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';
import { LogonComponent } from '../auth/logon/logon.component'; // dialog page
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../servicesDB/data.service';

@Component({
  selector: 'app-landing-content',
  templateUrl: './landing-content.component.html',
  styleUrls: ['./landing-content.component.css'],
})
export class LandingContentComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) public sidenav!: MatDrawer;

  _Allproducts_ !: Observable<any>;

  constructor(
    private _sideNavService: ViewInteractionService,
    private _dialogRef: MatDialog,
    private _router: Router,
    private _dataService: DataService,
  ) { }

  ngOnInit(): void {
    this._sideNavService.setSidenav(this.sidenav);

    // Dialog setup
    this._dialogRef.open(LogonComponent, {
      width: '35%',
      height: '80%'
    });

    //this._products_ = this.dataService_.getProducts(); // async used
    const from_Strore = this._dataService.allProducts_;
    this._Allproducts_ = from_Strore;

  }// ngOnInit

  openProduct(id: number, cat: string) {
    // this.route_.navigate(['product'], {queryParams: {pid: id, cat:cat } });
    this._router.navigate(['product',id,cat]);
  }

}