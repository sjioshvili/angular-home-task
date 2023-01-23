import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleManagerModalComponent } from './product-modal.component';

describe('TaskModalComponent', () => {
  let component: SaleManagerModalComponent;
  let fixture: ComponentFixture<SaleManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleManagerModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SaleManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
