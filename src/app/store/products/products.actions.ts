import { Product } from '../../models/product';
import { ProductSell } from '../../models/productSell';

export class GetProducts {
  static readonly type = '[Product] Get Product';
  constructor() {}
}

export class AddProduct {
  static readonly type = '[Product] Add Product';
  constructor(public product: Product) {}
}

export class EditProduct {
  static readonly type = '[Product] Edit Product';
  constructor(public product: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Product] Delete Product';
  constructor(public id: number) {}
}
export class SellProduct {
  static readonly type = '[Product] Sell Product';
  constructor(public product: ProductSell) {}
}
