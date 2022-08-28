import { Component, OnInit } from '@angular/core';
import { ViewInteractionService } from '../servicesUI/view-interaction.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private sideNavService_: ViewInteractionService,
  ) {}

  menuToggleActive$:boolean = false; // not in use
  searchVal$!: string;
  searchDefaultList$!: Observable<string[]>;

  searchInput = new FormControl('');

  ngOnInit(): void {

  }

  menuClicked(){
    // this.menuToggleActive = !this.menuToggleActive;
		this.sideNavService_.toggle();
  }

}
