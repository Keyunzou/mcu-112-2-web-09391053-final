import { Component, EventEmitter, HostBinding, Input, Output, numberAttribute } from '@angular/core';
import { Product } from '../model/product';
import { PaginationComponent } from '../pagination/pagination.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-card-list',
  standalone: true,
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './product-card-list.component.html',
  styleUrl: './product-card-list.component.css',
})
export class ProductCardListComponent {
  @Input({ required: true })
  products!: Product[] | null;

  @Input({ required: true, transform: numberAttribute })
  pageSize!: number;

  @Input({ required: true, transform: numberAttribute })
  pageIndex!: number;
  @Output()
  pageIndexChange = new EventEmitter<number>();

  @Input({ required: true, transform: numberAttribute })
  totalCount!: number;

  @Output()
  addTo = new EventEmitter<Product>();

  @HostBinding('class')
  class = 'product-card-list';
}
