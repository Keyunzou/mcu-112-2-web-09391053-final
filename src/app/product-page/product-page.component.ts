import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private readonly productService = inject(ProductService);

  pageSize = 5;

  private readonly pageIndex$ = new BehaviorSubject<number>(1);
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }
  get pageIndex(): number {
    return this.pageIndex$.value;
  }

  products$ = this.pageIndex$.pipe(switchMap(() => this.productService.getList(this.pageIndex, this.pageSize)));

  productCount$ = this.productService.getCount();
}
