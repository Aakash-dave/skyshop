import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { DataService } from '../servicesDB/data.service';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  @ViewChild('sidenav', { static: true }) public sidenav!: MatDrawer;

  constructor(private _uiService: ViewInteractionService) {
  }

  ngOnInit(): void {
    this._uiService.setSidenav(this.sidenav);
  }

}
