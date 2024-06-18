import { Component } from '@angular/core';
import { Product } from '../model/product';
import { ProductCardListComponent } from '../product-card-list/product-card-list.component';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductCardListComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css',
})
export class ProductPageComponent {
  products: Product[] = [
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: true,
    }),
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: false,
    }),
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: true,
    }),
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: true,
    }),
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: true,
    }),
    new Product({
      id: 1,
      name: '圖像 Angular 開發入門 第二版',
      imgUrl: 'https://api.fnkr.net/testimg/200x200/DDDDDD/999999/?text=img',
      company: '博碩文化',
      price: 1580,
      isShow: true,
    }),
  ];
}
