import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';


//3rd party
import { NgxImageZoomModule } from 'ngx-image-zoom';

//NGRX
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

// Services
import { ViewInteractionService } from './servicesUI/view-interaction.service';
import { DataService } from './servicesDB/data.service';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDrawer } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';


// Components
import { FooterComponent } from './footer/footer.component';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { HeaderComponent } from './header/header.component';
import { LogonComponent } from './auth/logon/logon.component';
import { OpenProductComponent } from './open-product/open-product.component';
import { OrderComponent } from './order/order.component';
import { ThankyouComponent } from './thankyou/thankyou.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LandingContentComponent,
    HeaderComponent,
    LogonComponent,
    OpenProductComponent,
    OrderComponent,
    ThankyouComponent,
  ],
  imports: [
    NgxImageZoomModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatMenuModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [ViewInteractionService, DataService, MatDrawer],
  bootstrap: [AppComponent]
})
export class AppModule { }
