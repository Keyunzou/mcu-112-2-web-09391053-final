import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css',
})
export class ProductDetailPageComponent {
  @Input()
  product!: Product;

  private router = inject(Router);

  readonly shoppingCartService = inject(ShoppingCartService);

  onBack(): void {
    this.router.navigate(['products']);
  }
}
