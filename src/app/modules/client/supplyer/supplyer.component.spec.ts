import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyerComponent } from './supplyer.component';

describe('SupplyerComponent', () => {
  let component: SupplyerComponent;
  let fixture: ComponentFixture<SupplyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
