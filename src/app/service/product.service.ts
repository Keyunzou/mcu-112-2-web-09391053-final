import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  getList(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this._url);
  }
}
