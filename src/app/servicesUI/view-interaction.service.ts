import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()

export class ViewInteractionService {

	constructor(
		private sidenav: MatDrawer,
		private _snackBar: MatSnackBar) { }

	public setSidenav(sidenav: MatDrawer) {
		this.sidenav = sidenav; // getting sidenav from landing-content.component
	}

	public toggle() {
		console.log('toggle..');
		return this.sidenav.toggle();
	}

	openSnackBar(message: string, actionBtn: string) {
		this._snackBar.open(message, actionBtn, {
			horizontalPosition: 'right',
			verticalPosition: 'top',
			duration: 3000,
		});
	}


}