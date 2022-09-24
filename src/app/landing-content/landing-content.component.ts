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
    private sideNavService_: ViewInteractionService,
    private dialogRef_: MatDialog,
    private route_: Router,
    private dataService_: DataService
  ) { }

  ngOnInit(): void {
    this.sideNavService_.setSidenav(this.sidenav);

    // Dialog setup
    this.dialogRef_.open(LogonComponent, {
      width: '35%',
      height: '80%'
    });

    //this._products_ = this.dataService_.getProducts(); // async used
    const from_Strore = this.dataService_.allProducts_;
    this._Allproducts_ = from_Strore;

  }// ngOnInit

  openProduct(id: number) {
    this.route_.navigate(['product'], {queryParams: {pid: id} });
  }

}