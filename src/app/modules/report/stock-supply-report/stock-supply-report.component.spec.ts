import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSupplyReportComponent } from './stock-supply-report.component';

describe('StockSupplyReportComponent', () => {
  let component: StockSupplyReportComponent;
  let fixture: ComponentFixture<StockSupplyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockSupplyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSupplyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
