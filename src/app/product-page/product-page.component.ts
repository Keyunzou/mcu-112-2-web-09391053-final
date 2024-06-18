import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  private readonly productService = inject(ProductService);

  pageSize = 5;

  readonly formControl = new FormControl<string | undefined>(undefined, { nonNullable: true });

  private readonly condition$ = new BehaviorSubject<string | undefined>(undefined);
  set condition(value: string | undefined) {
    this.condition$.next(value);
  }
  get condition(): string | undefined {
    return this.condition$.value;
  }

  private readonly pageIndex$ = new BehaviorSubject<number>(1);
  set pageIndex(value: number) {
    this.pageIndex$.next(value);
  }
  get pageIndex(): number {
    return this.pageIndex$.value;
  }

  products$ = combineLatest([this.condition$, this.pageIndex$]).pipe(
    switchMap(() => this.productService.getList(this.condition, this.pageIndex, this.pageSize))
  );

  productCount$ = this.condition$.pipe(switchMap(() => this.productService.getCount(this.condition)));
}
