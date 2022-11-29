import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyerManagementComponent } from './supplyer-management.component';

describe('SupplyerManagementComponent', () => {
  let component: SupplyerManagementComponent;
  let fixture: ComponentFixture<SupplyerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
