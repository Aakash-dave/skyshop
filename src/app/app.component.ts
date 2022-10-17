import { Component, OnInit } from '@angular/core';
import { DataService } from './servicesDB/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SkyShop';

  constructor(private store: DataService) {
  }

  ngOnInit(): void {
    this.store.init();
  }

}
