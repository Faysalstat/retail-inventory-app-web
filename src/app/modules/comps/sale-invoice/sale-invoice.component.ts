import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-sale-invoice',
  templateUrl: './sale-invoice.component.html',
  styleUrls: ['./sale-invoice.component.css']
})
export class SaleInvoiceComponent implements OnInit {
  saleInvoiceForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    // private productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

}
