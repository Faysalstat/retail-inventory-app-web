import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
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
  person: Person = new Person();
  personId!: number;
  showLoader: boolean = false;
  errMsg: string = '';
  constructor(
    private route: Router,
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
  searchSupllyer() {
    this.clientService.getClientByContactNo(this.person.contactNo).subscribe({
      next: (res) => {
        if (res.body) {
          this.notificationService.showMessage(
            'SUCCESS!',
            'Person Found',
            'OK',
            2000
          );
          this.person = res.body;
          if (res.body.customer) {
            this.customer = res.body.customer;
            this.saleInvoiceIssueForm
              .get('customerId')
              ?.setValue(this.customer.id);
            this.isCustomerExist = true;
          } else {
            this.errMsg =
              '** This person is not a Customer, Please Add as a Customer';
            this.isCustomerExist = false;
          }
        } else {
          this.person.personAddress = '';
          this.person.personName = '';
          this.person.id = 0;
          this.isCustomerExist = false;
          return;
        }
      },
      error: (err) => {
        this.isCustomerExist = false;
        console.log(err.message);
        this.notificationService.showMessage(
          'ERROR!',
          'Customer Found Failed' + err.message,
          'OK',
          2000
        );
      },
      complete: () => {},
    });
  }
  addCustomer() {
    const params: Map<string, any> = new Map();
    let supplyerModel = {
      personId: this.person.id,
      clientType: 'CUSTOMER',
      personName: this.person.personName,
      contactNo: this.person.contactNo,
      personAddress: this.person.personAddress,
      shopName: this.customer.shopName,
      // regNo: this.customer.regNo
    };
    params.set('client', supplyerModel);

    this.clientService.addClient(params).subscribe({
      next: (res) => {
        if (res.body) {
          this.isCustomerExist = true;
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
  productSelected(event: any) {
    this.selectedProduct = event.option.value;
    this.orderItem.productId = this.selectedProduct.id;
    this.orderItem.productName = this.selectedProduct.productName;
    this.orderItem.unitType = this.selectedProduct.unitType;
    this.orderItem.packagingCategory = this.selectedProduct.packagingCategory;
    this.orderItem.unitPerPackage = this.selectedProduct.unitPerPackage;
    this.orderItem.pricePerUnit = this.selectedProduct.sellingPricePerUnit;
    this.unitType = this.selectedProduct.unitType;

    console.log(this.selectedProduct);
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice =
      this.orderItem.quantityOrdered * this.orderItem.pricePerUnit;
    this.orderItem.quantityOrdered =
      this.orderItem.quantityOrdered / this.orderItem.unitPerPackage;
  }
  calculateQuantity() {
    this.orderItem.quantityOrdered =
      this.orderItem.unitPerPackage * this.orderItem.packageQuantity;
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
  // testing
  onChangeProduc() {
    console.log(this.selectedProduct);
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
    params.set('invoice', orderIssueModel);
    this.inventoryService.issueSalesOrder(params).subscribe({
      next: (res) => {
        console.log(res.body);
        this.notificationService.showMessage(
          'SUCCESS!',
          'Invoice Created',
          'OK',
          500
        );
        this.route.navigate(['/sale/sale-invoice-list']);
      },
      error: (err) => {
        console.log(err);
        this.notificationService.showMessage(
          'ERROR!',
          'Invoice Not Created',
          'OK',
          500
        );
      },
    });
  }
}
