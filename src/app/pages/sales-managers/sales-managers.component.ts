import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../models/product';
import { SalesManager } from '../../models/salesManager';
import { ProductModalComponent } from '../products/product-modal/product-modal.component';
import { filter } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SaleManagerModalComponent } from './sales-manager-modal/sale-manager-modal.component';

@Component({
  selector: 'app-sales-managers',
  templateUrl: './sales-managers.component.html',
  styleUrls: ['./sales-managers.component.scss'],
})
export class SalesManagersComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ELEMENT_DATA: SalesManager[] = [
    {
      id: 2,
      userName: 'manager',
      lastName: 'test',
      regDate: '01/01/2020',
      password: 'test',
      totalAmount: 500,
      firstName: 'test',
    },
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = [
    'userName',
    'firstName',
    'lastName',
    'regDate',
    'totalAmount',
  ];
  dataSource = new MatTableDataSource<SalesManager>(this.ELEMENT_DATA);

  filterValues = {
    userName: '',
    firstName: '',
    lastName: '',
    regStartDate: '',
    regEndDate: '',
    amountStart: '',
    amountEnd: '',
  };

  filterForm = new FormGroup({
    userName: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    regStartDate: new FormControl(),
    regEndDate: new FormControl(),
    amountStart: new FormControl(),
    amountEnd: new FormControl(),
    amountRange: new FormControl({ minimum: 0, maximum: 1000 }),
  });

  ngOnInit() {
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
        this.filterValues['regStartDate'] = regStartDate;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    this.filterForm.get('regEndDate')?.valueChanges.subscribe((regEndDate) => {
      this.filterValues['regEndDate'] = regEndDate;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.filterForm
      .get('amountStart')
      ?.valueChanges.subscribe((amountStart) => {
        this.filterValues['amountStart'] = amountStart;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });
    this.filterForm.get('amountEnd')?.valueChanges.subscribe((amountEnd) => {
      this.filterValues['amountEnd'] = amountEnd;
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
          .indexOf(searchString.lastName.toLowerCase()) !== -1;
      // &&
      // data.regDate
      //   .toString()
      //   .trim()
      //   .toLowerCase()
      //   .indexOf(searchString.regDate.toLowerCase()) !== -1

      return resultValue;
    };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  public addNewManager(): void {
    const dialogRef = this.dialog.open(SaleManagerModalComponent, {
      width: '460px',
      height: '600px',
    });
    dialogRef
      .afterClosed()
      .pipe(filter((response: boolean) => response))
      .subscribe(() => {
        // this.taskService.taskListUpdate.next(true);
      });
  }
}
