import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, Observable } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Select, Store } from '@ngxs/store';
import { ManagerState } from '../../store/sale-managers/saleManagers.state';
import {
  AddManager,
  DeleteManager,
  EditManager,
  GetManagers,
} from '../../store/sale-managers/saleManagers.action';

import { DeleteDialogComponent } from '../../components/shared/delete-dialog/delete-dialog.component';
import { SalesManager } from '../../models/salesManager';
import { SaleManagerModalComponent } from './sales-manager-modal/sale-manager-modal.component';
import { SaleHistoryModalComponent } from './sales-history/sale-history-modal.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-sales-managers',
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
})
export class SalesManagersComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private store: Store,
    private datePipe: DatePipe
  ) {}

  dataSource = new MatTableDataSource<SalesManager>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'userName',
    'firstName',
    'lastName',
    'regDate',
    'totalAmount',
    'actions',
  ];

  filterValues = {
    userName: '',
    firstName: '',
    lastName: '',

    regStartDate: '2020-01-01',
    regEndDate: '2024-01-01',
    // set default search values
    amountStart: 0,
    amountEnd: 1000,
  };

  filterForm = new FormGroup({
    userName: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    regStartDate: new FormControl(new Date(2020, 1, 1)),
    regEndDate: new FormControl(new Date(2024, 1, 1)),
    amountStart: new FormControl(),
    amountEnd: new FormControl(),
    amountRange: new FormControl({ minimum: 0, maximum: 1000 }),
  });

  ngOnInit() {
    this.getManagers();
    this.formSubscribe();
    this.getFormsValue();
  }

  formSubscribe() {
    this.filterForm.get('userName')?.valueChanges.subscribe((userName) => {
      this.filterValues['userName'] = userName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.filterForm.get('firstName')?.valueChanges.subscribe((firstName) => {
      this.filterValues['firstName'] = firstName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm.get('lastName')?.valueChanges.subscribe((lastName) => {
      this.filterValues['lastName'] = lastName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm
      .get('regStartDate')
      ?.valueChanges.subscribe((regStartDate) => {
        // @ts-ignore
        this.filterValues['regStartDate'] = regStartDate
          ? regStartDate
          : new Date(2020, 1, 1).toISOString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.filterForm.get('regEndDate')?.valueChanges.subscribe((regEndDate) => {
      // @ts-ignore
      this.filterValues['regEndDate'] = regEndDate
        ? regEndDate
        : new Date(2020, 1, 1).toISOString();
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm.get('amountRange')?.valueChanges.subscribe((amount) => {
      // @ts-ignore
      this.filterValues['amountStart'] = amount.minimum ? amount?.minimum : 0;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.filterForm.get('amountRange')?.valueChanges.subscribe((amount) => {
      // @ts-ignore
      this.filterValues['amountEnd'] = amount.maximum ? amount?.maximum : 1000;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);

      const resultValue =
        data.userName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.userName.toLowerCase()) !== -1 &&
        data.firstName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.firstName.toLowerCase()) !== -1 &&
        data.lastName
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.lastName.toLowerCase()) !== -1 &&
        // @ts-ignore
        this.datePipe.transform(data.regDate, 'yyyy-MM-dd') >=
          // @ts-ignore
          this.datePipe.transform(searchString.regStartDate, 'yyyy-MM-dd') &&
        // @ts-ignore
        this.datePipe.transform(data.regDate, 'yyyy-MM-dd') <=
          // @ts-ignore
          this.datePipe.transform(searchString.regEndDate, 'yyyy-MM-dd') &&
        Number(data.totalAmount ? data.totalAmount : 0) >=
          Number(searchString.amountStart) &&
        Number(data.totalAmount ? data.totalAmount : 0) <=
          Number(searchString.amountEnd);

      return resultValue;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  @Select(ManagerState.getManagerSelector) getManagersOb$!: Observable<
    SalesManager[]
  >;
  getManagers() {
    this.store.dispatch(new GetManagers());
    this.getManagersOb$.subscribe((res) => {
      const managers = res;
      this.dataSource = new MatTableDataSource(managers);
    });
  }

  public openManagerModal(manager?: SalesManager): void {
    const dialogRef = this.dialog.open(SaleManagerModalComponent, {
      width: '460px',
      height: '600px',
      data: {
        manager: manager,
      },
    });
    dialogRef.afterClosed().subscribe((data: SalesManager) => {
      if (data) {
        const manager: SalesManager = {
          id: data.id || Math.floor(Math.random()),
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          password: data.password,
          regDate: data.regDate,
        };
        let actObject = data.id
          ? new EditManager(manager)
          : new AddManager(manager);
        this.store.dispatch(actObject).subscribe(() => {
          this.getManagers();
        });
      }
    });
  }

  public deleteManager(element: SalesManager): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Manager',
        text: `Are you sure you want to delete  Manager ${element.userName}?`,
      },
    });
    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.store.dispatch(new DeleteManager(element.id)).subscribe(() => {
          this.getManagers();
        });
      }
    });
  }

  public openHistory(manager: SalesManager): void {
    const dialogRef = this.dialog.open(SaleHistoryModalComponent, {
      width: '600px',
      height: '500px',
      data: {
        manager: manager,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(filter((response: boolean) => response))
      .subscribe(() => {
        // this.taskService.taskListUpdate.next(true);
      });
  }
}
