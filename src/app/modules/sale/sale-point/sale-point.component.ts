import { Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToWords } from 'to-words';
import {
  Account,
  COFIGS,
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
  @ViewChild('receiptComponent', { static: false, read: ElementRef }) PrintableReceiptComponent!: ElementRef;

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
  totalDueAmount: number = 0;
  balanceTitle: string = 'Balance';
  comment: string = '';
  isApprovalNeeded: boolean = true;
  userName: any;
  rebate: number = 0;
  paymentMethods: any[] = [];
  availableStock: number = 0;
  balanceType: string = 'Payable';
  productCode: string = '';
  toWords = new ToWords();
  isLengthError: boolean = false;
  customerBalanceStatus: string = "Due";
  isWalkingCustomer:boolean = false;
  stockMsg = "";


  showReceipt = true
  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private pdfMakeService: PdfMakeService,
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
    this.getConfig(COFIGS.SALE_APPROVAL_NEEDED);
    this.userName = localStorage.getItem('username');
    // console.log(this.toWords.convert(1239271392))
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
      totalCost: [formData.totalCost],
      previousBalance: [formData.previousBalance],
      totalPayableAmount: [formData.totalPayableAmount],
      totalPaidAmount: [formData.totalPaidAmount],
      duePayment: [formData.duePayment],
      rebate: [formData.rebate],
      paymentMethod: [formData.paymentMethod || 'CASH'],
      comment: [formData.comment],
      extraCharge: [formData.extraCharge],
      chargeReason: [formData.chargeReason],
    });
    // this.saleInvoiceIssueForm.get('duePayment')?.disable();
    this.saleInvoiceIssueForm.get('duePayment')?.valueChanges.subscribe((data) => {
      this.totalDueAmount = data;
      if(data<0){
        this.customerBalanceStatus = "Balance";
      }else{
        this.customerBalanceStatus = "Due";
      }
    })
    this.saleInvoiceIssueForm
      .get('totalPaidAmount')
      ?.valueChanges.subscribe((data) => {
        this.saleInvoiceIssueForm
          .get('duePayment')
          ?.setValue(this.totalPayableAmount - data);
      });
  }
  searchCustomer() {
    if (this.person.contactNo.length < 11) {
      this.isLengthError = true;
      return;
    } else {
      this.isLengthError = false;
    }
    this.showLoader = true;
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
        this.notificationService.showMessage(
          'ERROR!',
          'Customer Found Failed' + err.message,
          'OK',
          2000
        );
      },
      complete: () => {
        this.showLoader = false;
      },
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
    const filterValue = name.toLowerCase();
    return this.productList.filter((product) =>
      product.productName.toLowerCase().includes(filterValue)
    );
  }

  private _filterCode(code: string): string[] {
    const filterValue = code.toLowerCase();
    return this.productList.filter((product) =>
      product.productCode.toLowerCase().includes(filterValue)
    );
  }
  productSelected(event: any) {
    this.selectedProduct = event.option.value;
    this.saleInvoiceIssueForm
      .get('productCode')
      ?.setValue(this.selectedProduct.productCode);
    this.saleInvoiceIssueForm
      .get('productName')
      ?.setValue(this.selectedProduct.productName);
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
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice = +(
      this.orderItem.quantityOrdered * this.orderItem.pricePerUnit
    ).toFixed(2);
    this.orderItem.totalOrderCost = +(
      this.orderItem.quantityOrdered * this.orderItem.buyingPricePerUnit
    ).toFixed(2);
  }
  calculateQuantity() {
    this.orderItem.quantityOrdered = +(
      this.orderItem.packageQuantity * this.orderItem.unitPerPackage +
      this.orderItem.looseQuantity
    ).toFixed(2);
    this.checkQuantity();
    this.calculateOrder();
  }
  calculateSummary() {
    this.totalPayableAmount = +(
      this.totalPrice -
      this.previousBalance -
      this.saleInvoiceIssueForm.get('rebate')?.value +
      this.saleInvoiceIssueForm.get('extraCharge')?.value
    ).toFixed(2);
    if(this.isWalkingCustomer){
      this.saleInvoiceIssueForm.get('totalPaidAmount')?.setValue(this.totalPayableAmount);
    }else{
      this.saleInvoiceIssueForm
      .get('duePayment')
      ?.setValue(
        this.totalPayableAmount -
          (this.saleInvoiceIssueForm.get('totalPaidAmount')?.value || 0)
      );
    }
    
  }

  // testing

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
    let totalCost = 0;
    this.orderList.map((elem) => {
      totalPrice += elem.totalOrderPrice;
      totalCost += elem.totalOrderCost;
    });
    this.saleInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.saleInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
    this.saleInvoiceIssueForm.get('totalCost')?.setValue(totalCost);
    this.saleInvoiceIssueForm.get('productName')?.setValue('');
    this.saleInvoiceIssueForm.get('productCode')?.setValue('');
    this.totalPrice = totalPrice;
    this.totalPayableAmount = this.totalPrice - this.previousBalance;

    if (this.totalPayableAmount < 0) {
      this.balanceType = 'Return';
    } else {
      this.balanceType = 'Payable';
      this.saleInvoiceIssueForm
        .get('duePayment')
        ?.setValue(this.totalPayableAmount);
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
    this.showLoader = true;
    let orderIssueModel = this.saleInvoiceIssueForm.value;
    orderIssueModel.accountId = this.account.id;
    orderIssueModel.comment = this.comment;
    orderIssueModel.totalPayableAmount = this.totalPayableAmount;
    orderIssueModel.previousBalance = this.account.balance;
    orderIssueModel.issuedBy = this.userName;
    const params: Map<string, any> = new Map();
    if (this.isApprovalNeeded) {
      let approvalModel = {
        payload: JSON.stringify(orderIssueModel),
        createdBy: this.userName,
        taskType: Tasks.CREATE_INVOICE,
        status: 'OPEN',
        state: 'OPEN'
      };
      const params: Map<string, any> = new Map();
      params.set('approval', approvalModel);
      this.inventoryService.sendToApproval(params).subscribe({
        next: (res) => {
          this.notificationService.showMessage(
            'SUCCESS!',
            'Approval Sent',
            'OK',
            2000
          );
          // this.downloadInvoice();
          // this.route.navigate(['/sale/sale-invoice-list']);
          window.location.reload();
        },
        error: (err) => {
          this.notificationService.showMessage(
            'Failed!',
            'Approval Sending Failed. ' + err.message,
            'OK',
            2000
          );
          this.showLoader = false;
        },
        complete: () => {
          this.showLoader = false;
        },
      });
    } else {
      this.showLoader = true;
      params.set('invoice', orderIssueModel);
      this.inventoryService.issueSalesOrder(params).subscribe({
        next: (res) => {
          this.downloadInvoice();
          this.notificationService.showMessage(
            'SUCCESS!',
            'Invoice Created',
            'OK',
            2000
          );
          // this.route.navigate(['/sale/sale-invoice-list']);
          window.location.reload();
        },
        error: (err) => {
          this.notificationService.showMessage(
            'ERROR!',
            'Invoice Not Created',
            'OK',
            2000
          );
          this.showLoader = false;
        },
        complete: () => {
          this.showLoader = false;
        },
      });
    }
  }
  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }

  downloadInvoice() {
    let orders: any[] = [];
    let index = 1;
    this.customer.person = this.person;
    this.orderList.forEach((elem: any) => {
      let orderRow = [];
      orderRow.push(index);
      orderRow.push(elem.productName);
      orderRow.push(elem.pricePerUnit);
      orderRow.push(elem.packageQuantity);
      orderRow.push(elem.looseQuantity);
      orderRow.push(elem.quantityOrdered + ' ' + elem.unitType);
      orderRow.push(elem.totalOrderPrice);
      index++;
      orders.push(orderRow);
    });
    let invoiceModel = {
      doNo: '',
      invoiceId: 'N/A',
      issuedBy: localStorage.getItem('personName'),
      customer: this.customer,
      tnxDate: this.applyFilter(new Date()),
      customerName: this.person.personName,
      customerAddress: this.person.personAddress,
      totalPrice: this.totalPrice,
      previousBalance: this.previousBalance,
      totalPayableAmount: this.totalPayableAmount,
      totalPayableAmountInWords: this.toWords.convert(
        Math.abs(this.totalPayableAmount)
      ),
      totalPaid: this.saleInvoiceIssueForm.get('totalPaidAmount')?.value,
      discount: this.saleInvoiceIssueForm.get('rebate')?.value,
      orders: orders,
      dueAmount:
        this.totalPayableAmount -
        this.saleInvoiceIssueForm.get('totalPaidAmount')?.value,
      extraCharge: this.saleInvoiceIssueForm.get('extraCharge')?.value,
      chargeReason:
        this.saleInvoiceIssueForm.get('chargeReason')?.value != ''
          ? this.saleInvoiceIssueForm.get('chargeReason')?.value
          : 'Extra Charge',
    };
    this.pdfMakeService.downloadSaleInvoice(invoiceModel);
  }

  showPositive(number: any) {
    return Math.abs(Number(number));
  }
  removeOrder(index:any){
    let removedOrder = this.orderList[index];
    this.orderList.splice(index,1);
    let totalPrice = 0;
    this.orderList.map((elem) => {
      totalPrice += elem.totalOrderPrice;
    });
    this.saleInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.saleInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
    this.totalPrice = totalPrice;
    this.calculateSummary();
    if(this.isWalkingCustomer){
      this.saleInvoiceIssueForm.get('totalPaidAmount')?.setValue(this.totalPayableAmount);
    }else{
      if (this.totalPayableAmount < 0) {
        this.balanceType = 'Return';
      } else {
        this.balanceType = 'Payable';
        this.saleInvoiceIssueForm
          .get('duePayment')
          ?.setValue(this.totalPayableAmount);
      }
    }
  }
  checkQuantity(){
    if(this.orderItem.quantityOrdered > this.availableStock){
      this.stockMsg = "Warning!! Stock Exceeded."
      this.notificationService.showErrorMessage("Stock Unavailable","You don't have enough Stock of this Product","OK",2000);
    }else{
      this.stockMsg = ""
    }
  }
  printReport() {
    const printContents = this.PrintableReceiptComponent.nativeElement.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
}
