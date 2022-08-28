import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { OpenProductComponent } from './open-product/open-product.component';

const routes: Routes = [
  {
    path: '', component: LandingContentComponent,
  },

  {
    path: 'product', component: OpenProductComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
