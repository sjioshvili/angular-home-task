import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProductModalComponent } from './sale-product-modal.component';

describe('TaskModalComponent', () => {
  let component: SaleProductModalComponent;
  let fixture: ComponentFixture<SaleProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleProductModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
