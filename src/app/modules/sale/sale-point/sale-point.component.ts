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
  Account,
  Customer,
  OrderIssueDomain,
  OrderItem,
  Person,
  Product,
  Tasks,
} from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { PdfMakeService } from '../../services/pdf-make.service';
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
  account: Account = new Account();
  selectedProduct = new Product();
  orderItem!: OrderItem;
  orderList!: any[];
  productList: any[] = [];
  filteredOptions!: any;
  filteredCodeOptions!: any;
  unitType: string = 'UNIT';
  person: Person = new Person();
  personId!: number;
  showLoader: boolean = false;
  errMsg: string = '';
  totalPrice: number = 0;
  previousBalance: number = 0;
  totalPayableAmount: number = 0;
  balanceTitle: string = 'Balance';
  comment: string = '';
  isApprovalNeeded: boolean = true;
  userName: string = 'MANAGER';
  rebate: number = 0;
  paymentMethods: any[] = [];
  availableStock: number = 0;
  balanceType: string = 'Payable';
  productCode: string = '';
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private pdfMakeService: PdfMakeService
  ) {
    this.customer = new Customer();
    this.customer.person = new Person();
    this.orderItem = new OrderItem();
    this.orderList = [];
    this.prepareInvoiceIssueForm(null);
    this.paymentMethods = [
      { label: 'Select Payment Method', value: '' },
      { label: 'BANK', value: 'BANK' },
      { label: 'BKASH', value: 'BKASH' },
      { label: 'CASH', value: 'CASH' },
    ];
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  getConfig(configname: any) {
    this.inventoryService.getConfigByName(configname).subscribe({
      next: (res) => {
        if (res.body && res.body.value == 1) {
          this.isApprovalNeeded = true;
        } else {
          this.isApprovalNeeded = false;
        }
      },
    });
  }

  onProductNameInput(event: any) {
    if (event.target.value == '') {
      this.filteredOptions = this.productList;
    } else {
      this.filteredOptions = this._filter(event.target.value);
    }
  }

  onProductCodeInput(event: any) {
    if (event.target.value == '') {
      this.filteredCodeOptions = this.productList;
    } else {
      this.filteredCodeOptions = this._filterCode(event.target.value);
    }
  }
  prepareInvoiceIssueForm(formData: any) {
    if (!formData) {
      formData = new OrderIssueDomain();
    }
    this.saleInvoiceIssueForm = this.formBuilder.group({
      id: [formData.id],
      doNo: [formData.doNo],
      invoiceNo: [formData.invoiceNo],
      customerId: [formData.customerId, [Validators.required]],
      // accountId:[formData.accountId,[Validators.required]],
      orders: [formData.orders, [Validators.required]],
      productName: [formData.productName],
      productCode: [formData.productCode],
      totalPrice: [formData.totalPrice, [Validators.required]],
      previousBalance: [formData.previousBalance],
      totalPayableAmount: [formData.totalPayableAmount],
      totalPaidAmount: [formData.totalPaidAmount],
      duePayment: [formData.duePayment],
      rebate: [formData.rebate],
      paymentMethod: [formData.paymentMethod || ''],
      comment: [formData.comment],
    });
  }
  searchCustomer() {
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
          console.log(res.body);
          if (res.body.customer) {
            this.customer = res.body.customer;
            this.account = this.customer.account;
            this.previousBalance = this.account.balance;
            if (this.account.balance < 0) {
              this.balanceTitle = 'Due';
            } else {
              this.balanceTitle = 'Balance';
            }
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
    let customerModel = {
      personId: this.person.id,
      clientType: 'CUSTOMER',
      personName: this.person.personName,
      contactNo: this.person.contactNo,
      personAddress: this.person.personAddress,
      shopName: this.customer.shopName,
      // regNo: this.customer.regNo
    };
    params.set('client', customerModel);

    this.clientService.addClient(params).subscribe({
      next: (res) => {
        if (res.body) {
          this.isCustomerExist = true;
          this.saleInvoiceIssueForm.get('customerId')?.setValue(res.body.id);
          console.log(res.body);
        }
        this.errMsg = '';
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
        this.filteredOptions = res.body;
        this.filteredCodeOptions = res.body;
        this.productList = res.body;
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
  private _filter(name: string): string[] {
    console.log('value--->', name);
    const filterValue = name.toLowerCase();
    return this.productList.filter((product) =>
      product.productName.toLowerCase().includes(filterValue)
    );
  }

  private _filterCode(code: string): string[] {
    console.log('value--->', code);
    const filterValue = code.toLowerCase();
    return this.productList.filter((product) =>
      product.productCode.toLowerCase().includes(filterValue)
    );
  }
  productSelected(event: any) {
    this.selectedProduct = event.option.value;
    this.saleInvoiceIssueForm.get('productCode')?.setValue(this.selectedProduct.productCode);
    this.saleInvoiceIssueForm.get('productName')?.setValue(this.selectedProduct.productName);
    this.orderItem.productId = this.selectedProduct.id;
    this.orderItem.productCode = this.selectedProduct.productCode;
    this.orderItem.productName = this.selectedProduct.productName;
    this.orderItem.unitType = this.selectedProduct.unitType;
    this.orderItem.packagingCategory = this.selectedProduct.packagingCategory;
    this.orderItem.unitPerPackage = this.selectedProduct.unitPerPackage;
    this.orderItem.pricePerUnit = this.selectedProduct.sellingPricePerUnit;
    this.orderItem.buyingPricePerUnit = this.selectedProduct.costPricePerUnit;
    this.orderItem.quantity = this.selectedProduct.quantity;
    this.unitType = this.selectedProduct.unitType;
    this.availableStock = this.selectedProduct.quantity;

    console.log(this.selectedProduct);
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice =
      this.orderItem.quantityOrdered * this.orderItem.pricePerUnit;
  }
  calculateQuantity() {
    this.orderItem.quantityOrdered =
      this.orderItem.packageQuantity * this.orderItem.unitPerPackage +
      this.orderItem.looseQuantity;
    this.calculateOrder();
  }
  calculateSummary() {
    this.totalPayableAmount =
      this.totalPrice -
      this.previousBalance -
      this.saleInvoiceIssueForm.get('rebate')?.value;
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
    let totalPrice = 0;
    this.orderList.map((elem) => {
      totalPrice += elem.totalOrderPrice;
    });
    this.saleInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.saleInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
    this.saleInvoiceIssueForm.get('productName')?.setValue('');
    this.saleInvoiceIssueForm.get('productCode')?.setValue('');
    this.totalPrice = totalPrice;
    this.totalPayableAmount = this.totalPrice - this.previousBalance;
    if (this.totalPayableAmount < 0) {
      this.balanceType = 'Return';
    } else {
      this.balanceType = 'Payable';
    }
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
    orderIssueModel.accountId = this.account.id;
    orderIssueModel.comment = this.comment;
    orderIssueModel.totalPayableAmount = this.totalPayableAmount;
    orderIssueModel.previousBalance = this.account.balance;
    console.log(orderIssueModel);
    const params: Map<string, any> = new Map();

    if (this.isApprovalNeeded) {
      let approvalModel = {
        payload: JSON.stringify(orderIssueModel),
        createdBy: this.userName,
        taskType: Tasks.CREATE_INVOICE,
        status: 'OPEN',
      };
      const params: Map<string, any> = new Map();
      params.set('approval', approvalModel);
      this.inventoryService.sendToApproval(params).subscribe({
        next: (res) => {
          this.notificationService.showMessage(
            'SUCCESS!',
            'Approval Sent',
            'OK',
            500
          );
          this.route.navigate(['/sale/sale-invoice-list']);
        },
        error: (err) => {
          this.notificationService.showMessage(
            'Failed!',
            'Approval Sending Failed. ' + err.message,
            'OK',
            500
          );
        },
      });
    } else {
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
  downloadInvoice() {
    let orders: any[] = [];
    let index = 1;
    this.orderList.forEach((elem) => {
      let orderRow = [];
      orderRow.push(index);
      orderRow.push(elem.productName);
      orderRow.push(elem.pricePerUnit);
      orderRow.push(elem.quantityOrdered + ' ' + elem.unitType);
      orderRow.push(elem.totalOrderPrice);
      index++;
      orders.push(orderRow);
    });
    let invoiceModel = {
      doNo: '5853',
      invoiceId: 'INV#0001',
      customerName: this.person.personName,
      customerAddress: this.person.personAddress,
      totalPrice: this.totalPrice,
      previousBalance: this.previousBalance,
      totalPayableAmount: this.totalPayableAmount,
      totalPaid: this.saleInvoiceIssueForm.get('totalPaidAmount')?.value,
      orders: orders,
    };
    this.pdfMakeService.downloadInvoice(invoiceModel);
  }

  showPositive(number: any) {
    return Math.abs(Number(number));
  }
}