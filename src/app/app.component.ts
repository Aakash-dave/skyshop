import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './servicesDB/data.service';
import { MatDrawer } from '@angular/material/sidenav';
import { ViewInteractionService } from './servicesUI/view-interaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SkyShop';

  @ViewChild('sidenav', { static: true }) public sidenav!: MatDrawer;

  constructor(private store: DataService,
    private _uiService: ViewInteractionService) {
  }

  ngOnInit(): void {
    this.store.init();

    this._uiService.setSidenav(this.sidenav);

  }

}
