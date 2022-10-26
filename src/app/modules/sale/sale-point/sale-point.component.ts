import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {
  Customer,
  OrderIssueDomain,
  OrderItem,
  Person,
  Product,
} from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';
@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.css'],
})
export class SalePointComponent implements OnInit {
  saleInvoiceIssueForm!: FormGroup;
  productFindForm!: FormGroup;
  isEdit: boolean = false;
  isCustomerExist: boolean = false;
  customer!: Customer;
  productName = new FormControl('');
  selectedProduct = new Product();
  orderItem!: OrderItem;
  orderList!: any[];
  productList: any[] = [];
  filteredOptions!: Observable<Product[]>;
  unitType: string = 'UNIT';
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService
  ) {
    this.customer = new Customer();
    this.customer.person = new Person();
    this.orderItem = new OrderItem();
    this.orderList = [];
    this.prepareInvoiceIssueForm(null);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  initOptions() {
    this.filteredOptions = this.productName.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.productList.slice();
      })
    );
  }
  prepareInvoiceIssueForm(formData: any) {
    if (!formData) {
      formData = new OrderIssueDomain();
    }
    this.saleInvoiceIssueForm = this.formBuilder.group({
      id: [formData.id],
      customerId: [formData.customerId, [Validators.required]],
      orders: [formData.orders, [Validators.required]],
      productName: [new FormControl('')],
      totalPrice: [formData.totalPrice, [Validators.required]],
      amountPaid: [formData.amountPaid],
      duePayment: [formData.duePayment],
      rebate: [formData.rebate],
      newPayment: [formData.newPayment],
      comment: [formData.comment],
    });
  }
  searchCustomer() {
    this.clientService
      .getClientByContactNo(this.customer.person.contactNo)
      .subscribe({
        next: (res) => {
          if (res.body) {
            console.log(res.body);
            this.customer = res.body;
            this.saleInvoiceIssueForm
              .get('customerId')
              ?.setValue(this.customer.id);
            this.isCustomerExist = true;
            this.notificationService.showMessage(
              'SUCCESS!',
              'Customer Exists',
              'OK',
              1000
            );
          }
        },
      });
  }
  addCustomer() {
    const params: Map<string, any> = new Map();
    let customerModel = {
      clientType: 'CUSTOMER',
      personName: this.customer.person.personName,
      contactNo: this.customer.person.contactNo,
      personAddress: this.customer.person.personAddress,
      shopName: this.customer.shopName,
    };
    params.set('client', customerModel);

    this.clientService.addClient(params).subscribe({
      next: (res) => {
        if (res.body) {
          this.saleInvoiceIssueForm.get('customerId')?.setValue(res.body.id);
          console.log(res.body);
        }
        this.notificationService.showMessage(
          'SUCCESS!',
          'Client Add Successful',
          'OK',
          1000
        );
      },
    });
  }
  fetchProducts() {
    const params: Map<string, any> = new Map();
    this.productService.fetchAllProductForDropDown().subscribe({
      next: (res) => {
        this.productList = res.body;
        this.initOptions();
        // this.notificationService.showMessage("SUCCESS!","Product gets Successfully","OK",1000);
      },
      error: (err) => {
        this.notificationService.showMessage(
          'ERROR!',
          'Product Getting Failed',
          'OK',
          1000
        );
      },
    });
  }
  displayFn(product: Product): string {
    return product && product.productName ? product.productName : '';
  }
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.productList.filter((product) =>
      product.productName.toLowerCase().includes(filterValue)
    );
  }
  productSelected(product: any) {
    this.selectedProduct = product;
    this.orderItem.productId = product.id;
    this.orderItem.productName = product.productName;
    this.orderItem.unitType = product.unitType;
    this.orderItem.pricePerUnit = product.sellingPricePerUnit;
    this.unitType = product.unitType;

    console.log(this.selectedProduct);
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice =
      this.orderItem.quantityOrdered * this.orderItem.pricePerUnit;
  }
  calculateSummary() {
    this.saleInvoiceIssueForm
      .get('duePayment')
      ?.setValue(
        this.saleInvoiceIssueForm.get('totalPrice')?.value -
          this.saleInvoiceIssueForm.get('amountPaid')?.value -
          this.saleInvoiceIssueForm.get('rebate')?.value
      );
  }
  addOrder() {
    if (
      !this.orderItem.productId ||
      !this.orderItem.quantityOrdered ||
      !this.orderItem.pricePerUnit
    ) {
      return;
    }
    this.orderList.push(this.orderItem);
    this.orderItem = new OrderItem();
    this.productName = new FormControl('');
    this.initOptions();
    let totalPrice = 0;
    this.orderList.map((elem) => {
      totalPrice += elem.totalOrderPrice;
    });
    this.saleInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.saleInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
  }
  calculateTotalPrice() {
    let totalPrice = 0;
    this.orderList.forEach((element) => {
      totalPrice = +element.totalOrderPrice;
    });
    this.saleInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
  }
  submitOrder() {
    if (!this.saleInvoiceIssueForm.valid) {
      this.notificationService.showMessage(
        'INVALID FORM!',
        'Please Input all fields',
        'OK',
        1000
      );
      return;
    }
    let orderIssueModel = this.saleInvoiceIssueForm.value;
    console.log(orderIssueModel);
    const params: Map<string, any> = new Map();
    params.set('order',orderIssueModel);
    this.inventoryService.issueSalesOrder(params).subscribe({

    })

  }
}
