import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

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

  ) { }

  searchVal$!: string;
  searchDefaultList$!: Observable<string[]>;

  ngOnInit(): void {

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
