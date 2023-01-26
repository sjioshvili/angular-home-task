export interface ProductSell {
  id: number;
  productId: number;
  name: string;
  price: number;
  count: number;
  sellDate?: string;
  managerId: number;
}
