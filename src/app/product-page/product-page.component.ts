import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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

  products$ = this.productService.getList();
}
