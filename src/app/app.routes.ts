import { Routes } from '@angular/router';
import { ProductPageComponent } from './product-page/product-page.component';
import { ShoppingCartPageComponent } from './shopping-cart-page/shopping-cart-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', component: ProductPageComponent },
  { path: 'shopping-cart', component: ShoppingCartPageComponent },
];
