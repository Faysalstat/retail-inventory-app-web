import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplyerComponent } from './add-supplyer.component';

describe('AddSupplyerComponent', () => {
  let component: AddSupplyerComponent;
  let fixture: ComponentFixture<AddSupplyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSupplyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSupplyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
