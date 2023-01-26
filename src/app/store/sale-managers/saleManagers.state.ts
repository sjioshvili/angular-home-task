import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs';
import { ProductSell } from '../../models/productSell';
import {
  AddManager,
  DeleteManager,
  EditManager,
  GetManagers,
  GetSaleHistory,
} from './saleManagers.action';
import { SalesManager } from '../../models/salesManager';
import { SaleManagerService } from '../../services/sale-manager.service';
import { SellProduct } from '../products/products.actions';

export interface ManagerStateModel {
  GetManagers: SalesManager[];
  AddManager: SalesManager[];
  EditManager: SalesManager[];
  DeleteManager: SalesManager[];
  GetSaleHistory: ProductSell[];
}

@State<ManagerStateModel>({
  name: 'Manager',
  defaults: {
    GetManagers: [],
    AddManager: [],
    EditManager: [],
    DeleteManager: [],
    GetSaleHistory: [],
  },
})
@Injectable()
export class ManagerState {
  constructor(private managerService: SaleManagerService) {}

  @Selector()
  static getManagerSelector(state: ManagerStateModel) {
    return state.GetManagers;
  }

  @Selector()
  static addManagerSelector(state: ManagerStateModel) {
    return state.AddManager;
  }

  @Selector()
  static deleteManagerSelector(state: ManagerStateModel) {
    return state.DeleteManager;
  }

  @Selector()
  static editManagerSelector(state: ManagerStateModel) {
    return state.EditManager;
  }

  @Selector()
  static saleHistorySelector(state: ManagerStateModel) {
    return state.GetSaleHistory;
  }

  @Action(GetManagers)
  getManagersStateAction(ctx: StateContext<ManagerStateModel>) {
    return this.managerService.getAllManagers().pipe(
      tap((res: SalesManager[]) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          GetManagers: res,
        });
      })
    );
  }

  @Action(AddManager)
  addManagersStateAction(
    ctx: StateContext<ManagerStateModel>,
    { manager }: AddManager
  ) {
    return this.managerService.addManager(manager).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          AddManager: res,
        });
      })
    );
  }

  @Action(EditManager)
  editManagersStateAction(
    ctx: StateContext<ManagerStateModel>,
    { manager }: EditManager
  ) {
    return this.managerService.editManager(manager).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          EditManager: res,
        });
      })
    );
  }

  @Action(DeleteManager)
  delManagersStateAction(
    ctx: StateContext<ManagerStateModel>,
    { id }: DeleteManager
  ) {
    return this.managerService.deleteManager(id).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          DeleteManager: res,
        });
      })
    );
  }

  @Action(GetSaleHistory)
  sellProductsStateAction(
    ctx: StateContext<ManagerStateModel>,
    { managerId }: GetSaleHistory
  ) {
    return this.managerService.getSaleHistory(managerId).pipe(
      tap((res: any) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          GetSaleHistory: res,
        });
      })
    );
  }
}
