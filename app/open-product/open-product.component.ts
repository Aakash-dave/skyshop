import { Component, OnInit } from '@angular/core';
import { DataService } from '../servicesDB/data.service';

@Component({
  selector: 'app-open-product',
  templateUrl: './open-product.component.html',
  styleUrls: ['./open-product.component.css']
})
export class OpenProductComponent implements OnInit {

  constructor(
    private dataService_: DataService
  ) { }

  ngOnInit(): void {
    this.dataService_.getProducts().subscribe(res => {
      // console.log(res);
    })
  }

}
