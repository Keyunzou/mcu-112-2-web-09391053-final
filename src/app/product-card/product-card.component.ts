import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, HostBinding, Input, Output, numberAttribute } from '@angular/core';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() productName!: string;
  @Input() authors!: string[];
  @Input() company!: string;
  @Input() imgUrl!: string;
  @Input({ transform: numberAttribute }) price!: number;

  @Input({ required: true })
  product!: Product;

  @HostBinding('class')
  class = 'product-card';

  @Output()
  view = new EventEmitter<void>();

  @Output()
  addTo = new EventEmitter<void>();
}
