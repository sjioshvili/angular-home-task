import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

import {
  AddProduct,
  DeleteProduct,
  EditProduct,
  GetProducts,
  SellProduct,
} from './products.actions';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { tap } from 'rxjs';
import { ProductSell } from '../../models/productSell';

export interface ProductStateModel {
  GetProducts: Product[];
  AddProduct: Product[];
  EditProduct: Product[];
  DeleteProduct: Product[];
  SellProduct: ProductSell[];
}

@State<ProductStateModel>({
  name: 'Products',
  defaults: {
    GetProducts: [],
    AddProduct: [],
    EditProduct: [],
    DeleteProduct: [],
    SellProduct: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productService: ProductService) {}

  @Selector()
  static getProductSelector(state: ProductStateModel) {
    return state.GetProducts;
  }

  @Selector()
  static addProductSelector(state: ProductStateModel) {
    return state.AddProduct;
  }

  @Selector()
  static deleteProductSelector(state: ProductStateModel) {
    return state.DeleteProduct;
  }

  @Selector()
  static editProductSelector(state: ProductStateModel) {
    return state.EditProduct;
  }

  @Selector()
  static sellProductSelector(state: ProductStateModel) {
    return state.SellProduct;
  }

  @Action(GetProducts)
  getProductsStateAction(ctx: StateContext<ProductStateModel>) {
    return this.productService.getAllProducts().pipe(
      tap((res: Product[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          GetProducts: res,
        });
      })
    );
  }

  @Action(AddProduct)
  addProductsStateAction(
    ctx: StateContext<ProductStateModel>,
    { product }: AddProduct
  ) {
    return this.productService.addProduct(product).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          AddProduct: res,
        });
      })
    );
  }

  @Action(EditProduct)
  editProductsStateAction(
    ctx: StateContext<ProductStateModel>,
    { product }: EditProduct
  ) {
    return this.productService.editProduct(product).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          EditProduct: res,
        });
      })
    );
  }

  @Action(DeleteProduct)
  delProductsStateAction(
    ctx: StateContext<ProductStateModel>,
    { id }: DeleteProduct
  ) {
    return this.productService.deleteProduct(id).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          DeleteProduct: res,
        });
      })
    );
  }

  @Action(SellProduct)
  sellProductsStateAction(
    ctx: StateContext<ProductStateModel>,
    { product }: SellProduct
  ) {
    return this.productService.sellProduct(product).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          SellProduct: res,
        });
      })
    );
  }
}
