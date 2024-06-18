import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input({ required: true })
  product!: Product;

  @Output()
  addTo = new EventEmitter<void>();

  @HostBinding('class')
  class = 'product-card';
}
