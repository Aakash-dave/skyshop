import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { OpenProductComponent } from './open-product/open-product.component';

const routes: Routes = [
  {
    path: '', component: LandingContentComponent,
  },

  {
    path: 'product/:pid/:cat', component: OpenProductComponent,
  },

  {
    path: 'cat/:cat', component: LandingContentComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
