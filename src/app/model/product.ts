export class Product {
  constructor(initData?: Partial<Product>) {
    Object.assign(this, initData);
  }

  id!: number;

  name!: string;

  imgUrl!: string;

  company!: string;

  price!: number;

  isShow!: boolean;
}
