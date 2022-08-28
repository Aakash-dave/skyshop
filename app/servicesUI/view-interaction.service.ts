import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable()

export class ViewInteractionService {

  constructor(	private sidenav: MatDrawer ) {}
	
  public setSidenav(sidenav: MatDrawer) {
		this.sidenav = sidenav; // getting sidenav from landing-content.component
	}

	public toggle() {
		return this.sidenav.toggle();
	}


}