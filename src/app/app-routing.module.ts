import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutdevComponent } from './aboutdev/aboutdev.component';
import { LandingContentComponent } from './landing-content/landing-content.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { OpenProductComponent } from './open-product/open-product.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '', component: MainpageComponent,
    children: [
      {
        path: '', component: LandingContentComponent,
      },
      {
        path: 'product/:pid/:cat', component: OpenProductComponent,
      },

      {
        path: 'category/:cat', component: LandingContentComponent,
      },

      {
        path: 'orders', component: OrderComponent,
      },
    ]
  },
  {
    path: 'dev', component: AboutdevComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
