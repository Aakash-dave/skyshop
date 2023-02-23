import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {

  constructor() { }

  orderNumber: number = 0;

  ngOnInit(): void {
    this.orderNumber = Math.floor((Math.random() * 100) + 100000);
  }

}
