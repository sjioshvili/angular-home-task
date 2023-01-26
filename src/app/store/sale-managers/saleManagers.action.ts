import { SalesManager } from '../../models/salesManager';

export class GetManagers {
  static readonly type = '[Manager] Get Managers';
  constructor() {}
}

export class AddManager {
  static readonly type = '[Manager] Add Manager';
  constructor(public manager: SalesManager) {}
}

export class EditManager {
  static readonly type = '[Manager] Edit Manager';
  constructor(public manager: SalesManager) {}
}

export class DeleteManager {
  static readonly type = '[Manager] Delete Manager';
  constructor(public id: number) {}
}
export class GetSaleHistory {
  static readonly type = '[Manager] Get SaleHistory';
  constructor(public managerId: number) {}
}
