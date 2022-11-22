import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../servicesDB/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('searchInput') searchInput!: ElementRef;

  constructor(
    private _sideNavService: ViewInteractionService,
    private _router: Router,
    private _dataService: DataService

  ) { }

  searchVal$!: string;
  searchDefaultList$!: Observable<string[]>;
  itemsIncart!: number;

  ngOnInit(): void {
    this._dataService.itemsIncart_sub.subscribe({
      next: (req: number) => {
        this.itemsIncart = req;
      }
    })
  }

  menuClicked() {
    // this.menuToggleActive = !this.menuToggleActive;
    this._sideNavService.toggle();
  }

  openCategory() {
    let category = this.searchInput.nativeElement.value;
    if (category) {
      this._router.navigate(['category', category]);
    }
    else {
      this._router.navigate(['']);
    }

  }

}
