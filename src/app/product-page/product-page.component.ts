import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, switchMap } from 'rxjs';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';
import { ProductService } from '../service/product.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  router = inject(Router);

  private readonly productService = inject(ProductService);

  readonly shoppingCartService = inject(ShoppingCartService);

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

  onView(product: Product): void {
    this.router.navigate(['product', 'view', product.id]);
  }
}
