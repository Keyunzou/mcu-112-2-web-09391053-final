import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, mergeMap, toArray } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly _url = 'http://localhost:3000/products';

  private readonly httpClient = inject(HttpClient);

  getList(pageIndex: number, pageSize: number): Observable<Product[]> {
    const query: { [key: string]: number | boolean } = { _page: pageIndex, _limit: pageSize };
    const option = { params: new HttpParams({ fromObject: query }) };
    return this.httpClient.get<Product[]>(this._url, option).pipe(
      mergeMap((products) => products),
      map((product) => new Product(product)),
      toArray()
    );
  }

  getCount(): Observable<number> {
    return this.httpClient.get<Product[]>(this._url).pipe(map((products) => products.length));
  }
}
