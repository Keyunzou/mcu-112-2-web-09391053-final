import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IOrderDetailForm } from '../interface/order-detail-form.interface';
import { IOrderForm } from '../interface/order-form.interface';
import { Product } from '../model/product';
import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.css',
})
export class ShoppingCartPageComponent implements OnInit {
  private readonly shoppingCartService = inject(ShoppingCartService);

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

  ngOnInit(): void {
    this.setOrderDetail();
  }

  private setOrderDetail(): void {
    for (const item of this.shoppingCartService.data) {
      const control = new FormGroup<IOrderDetailForm>({
        id: new FormControl<number>(item.id, { nonNullable: true }),
        product: new FormControl<Product>(item.product, { nonNullable: true }),
        count: new FormControl<number>(item.count, { nonNullable: true }),
      });
      this.details.push(control);
    }
  }

  onDelete(index: number, id: number | undefined): void {
    this.details.removeAt(index);
    this.shoppingCartService.deleteProduct(id!);
  }
}
