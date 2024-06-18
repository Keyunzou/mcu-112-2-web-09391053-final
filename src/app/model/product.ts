export class Product {
  constructor(initData?: Partial<Product>) {
    Object.assign(this, initData);
  }

  id!: number;

  name!: string;

  imgUrl!: string;

  authors!: string[];

  company!: string;

  price!: number;

  hasDiscount!: boolean;

  isShow!: boolean;
}
