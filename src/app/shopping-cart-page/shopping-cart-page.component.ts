import { AsyncPipe, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { IOrderDetailForm } from '../interface/order-detail-form.interface';
import { IOrderForm } from '../interface/order-form.interface';
import { Order } from '../model/order';
import { OrderDetail } from '../model/order-detail';
import { Product } from '../model/product';
import { OrderService } from '../service/order.service';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css',
})
export class ShoppingCartPageComponent implements OnInit {
  private readonly router = inject(Router);

  private readonly shoppingCartService = inject(ShoppingCartService);

  private readonly orderService = inject(OrderService);

  readonly form = new FormGroup<IOrderForm>({
    name: new FormControl<string | undefined>(undefined, { nonNullable: true, validators: [Validators.required.bind(this)] }),
    address: new FormControl<string | undefined>(undefined, { nonNullable: true, validators: [Validators.required.bind(this)] }),
    telephone: new FormControl<string | undefined>(undefined, { nonNullable: true, validators: [Validators.required.bind(this)] }),
    details: new FormArray<FormGroup<IOrderDetailForm>>([]),
  });

  get name(): FormControl<string | undefined> {
    return this.form.get('name') as FormControl<string | undefined>;
  }

  get address(): FormControl<string | undefined> {
    return this.form.get('address') as FormControl<string | undefined>;
  }

  get telephone(): FormControl<string | undefined> {
    return this.form.get('telephone') as FormControl<string | undefined>;
  }

  get details(): FormArray<FormGroup<IOrderDetailForm>> {
    return this.form.get('details') as FormArray<FormGroup<IOrderDetailForm>>;
  }

  totalPrice = 0;

  get formData(): Order {
    return new Order({
      name: this.name.value,
      address: this.address.value,
      telephone: this.telephone.value,
      details: this.details.value.map((item) => new OrderDetail(item)),
    });
  }

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.details.valueChanges
      .pipe(
        map((items) => (items.length === 0 ? 0 : items.reduce((total, item) => total + (item.price || 0), 0))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((totalPrice) => (this.totalPrice = totalPrice));

    this.setOrderDetail();
  }

  private setOrderDetail(): void {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<IOrderDetailForm>({
        id: new FormControl<number>(item.id, { nonNullable: true }),
        product: new FormControl<Product>(item.product, { nonNullable: true }),
        count: new FormControl<number>(item.count, { nonNullable: true }),
        price: new FormControl<number>(item.product.price * item.count, { nonNullable: true }),
      });
      control
        .get('count')!
        .valueChanges.pipe(
          filter((value) => value !== undefined),
          map((value) => value * item.product.price),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe((price) => control.get('price')!.setValue(price, { emitEvent: false }));
      this.details.push(control);
    }
  }

  onDelete(index: number, id: number | undefined): void {
    this.details.removeAt(index);
    this.shoppingCartService.deleteProduct(id!);
  }

  onSave(): void {
    this.orderService.add(this.formData).subscribe(() => {
      this.shoppingCartService.clear();
      this.router.navigate(['/']);
    });
  }
}
