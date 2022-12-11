import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiveComponent } from './cash-receive.component';

describe('CashReceiveComponent', () => {
  let component: CashReceiveComponent;
  let fixture: ComponentFixture<CashReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashReceiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
