import { CurrencyPipe } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true })
  product!: Product;

  @HostBinding('class')
  class = 'product-card';
}
