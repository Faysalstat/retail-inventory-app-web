import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import {
  COFIGS,
  OrderItem,
  Person,
  Product,
  Supplyer,
  SupplyIssueDomain,
  Tasks} from '../../model/models';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css'],
})
export class AddStockComponent implements OnInit {
  supplyInvoiceIssueForm!: FormGroup;
  productFindForm!: FormGroup;
  isEdit: boolean = false;
  isSupplyerExist: boolean = false;
  supplyer!: Supplyer;
  person: Person = new Person();
  personId!: number;
  productName ='';
  selectedProduct = new Product();
  orderItem!: OrderItem;
  selectedOrderItem!: OrderItem;
  orderList!: any[];
  productList: any[] = [];
  filteredOptions!: any;
  unitType: string = 'UNIT';
  showLoader: boolean = false;
  errMsg: string = '';
  isApprovalNeeded : boolean = false;
  totalPrice:number = 0;
  subTotalPrice:number = 0;
  comment!:string;
  userName:string = "Manager"
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService
  ) {
    this.supplyer = new Supplyer();
    this.person = new Person();
    this.orderItem = new OrderItem();
    this.orderList = [];
    this.prepareInvoiceIssueForm(null);
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.getConfig(COFIGS.STOCK_APPROVAL_NEEDED);
  }

  getConfig(configname:any){
    this.inventoryService.getConfigByName(configname).subscribe({
      next:(res)=>{
        if(res.body && res.body.value==1){
          this.isApprovalNeeded = true;
        }else{
          this.isApprovalNeeded = false;
        }
      }
    })
  }
  prepareInvoiceIssueForm(formData: any) {
    if (!formData) {
      formData = new SupplyIssueDomain();
    }
    this.supplyInvoiceIssueForm = this.formBuilder.group({
      id: [formData.id],
      supplyerId: [formData.supplyerId],
      orders: [formData.orders, [Validators.required]],
      schedules: [formData.schedules],
      productName: [formData.productName],
      productCode: [formData.productCode],
      totalPrice: [formData.totalPrice, [Validators.required]],
      rebate: [formData.rebate],
      comment: [formData.comment],
    });
  }
  searchSupllyer() {
    const params: Map<string, any> = new Map();
    params.set("id","");
    params.set("code",this.supplyer.code);
    this.clientService.getSupplyerByCode(params).subscribe({
      next: (res) => {
        if (res.body) {
          console.log(res.body);
          this.notificationService.showMessage(
            'SUCCESS!',
            res.message,
            'OK',
            2000
          );
          this.supplyer = res.body;
          if (res.body) {
            this.supplyer = res.body;
            this.person = this.supplyer.person;
            this.isSupplyerExist = true;
          } else {
            this.errMsg = '** Supplyer Not Found, Add One';
            this.isSupplyerExist = false;
          }
        } else {
          this.person.personAddress = '';
          this.person.personName = '';
          this.person.id = 0;
          this.isSupplyerExist = false;
          return;
        }
      },
      error: (err) => {
        this.isSupplyerExist = false;
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
  // addSupplyer() {
  //   const params: Map<string, any> = new Map();
  //   let supplyerModel = {
  //     personId: this.person.id,
  //     clientType: 'SUPPLYER',
  //     personName: this.person.personName,
  //     contactNo: this.person.contactNo,
  //     personAddress: this.person.personAddress,
  //     shopName: this.supplyer.shopName,
  //     regNo: this.supplyer.regNo,
  //   };
  //   params.set('client', supplyerModel);

  //   this.clientService.addClient(params).subscribe({
  //     next: (res) => {
  //       if (res.body) {
  //         this.isSupplyerExist = true;
  //         this.supplyInvoiceIssueForm.get('supplyerId')?.setValue(res.body.id);
  //         console.log(res.body);
  //       }
  //       this.errMsg = '';
  //       this.notificationService.showMessage(
  //         'SUCCESS!',
  //         'Client Add Successful',
  //         'OK',
  //         1000
  //       );
  //     },
  //     error: (err) => {
  //       console.log(err);
  //       this.notificationService.showMessage(
  //         'SUCCESS!',
  //         'Client Add Failed',
  //         'OK',
  //         500
  //       );
  //     },
  //   });
  // }
  fetchProducts() {
    this.showLoader = true;
    const params: Map<string, any> = new Map();
    this.productService.fetchAllProductForDropDown().subscribe({
      next: (res) => {
        this.productList = res.body;
        this.filteredOptions = res.body;
      },
      error: (err) => {
        this.notificationService.showMessage(
          'ERROR!',
          'Product Getting Failed',
          'OK',
          1000
        );
      },
      complete: () => {
        this.showLoader = false;
      },
    });
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
    this.supplyInvoiceIssueForm.get("productName")?.setValue(this.selectedProduct.productName);
    this.supplyInvoiceIssueForm.get("productCode")?.setValue(this.selectedProduct.productCode);
    this.orderItem.productId = this.selectedProduct.id;
    this.orderItem.productName = this.selectedProduct.productName;
    this.orderItem.productCode = this.selectedProduct.productCode;
    this.orderItem.unitType = this.selectedProduct.unitType;
    this.orderItem.pricePerUnit = this.selectedProduct.costPricePerUnit;
    this.orderItem.unitPerPackage = this.selectedProduct.unitPerPackage;
    this.unitType = this.selectedProduct.unitType;
    console.log(this.selectedProduct);
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice =
      this.orderItem.quantityOrdered * this.orderItem.pricePerUnit;
  }
  addSupplyOrder() {
    if (
      !this.orderItem.productId ||
      !this.orderItem.quantityOrdered ||
      !this.orderItem.pricePerUnit
    ) {
      return;
    }
    this.orderList.push(this.orderItem);
    this.orderItem = new OrderItem();
    this.productName = '';
    this.totalPrice = 0;
    this.orderList.map((elem) => {
      this.totalPrice += elem.totalOrderPrice;
    });
    this.supplyInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.supplyInvoiceIssueForm.get('totalPrice')?.setValue(this.totalPrice);
    this.supplyInvoiceIssueForm.get("productName")?.setValue('');
    this.supplyInvoiceIssueForm.get("productCode")?.setValue('');
    this.calculateSummary();
  }
  onOrderSelect(event: any) {
    console.log(event);
  }
  calculateSummary() {
    this.subTotalPrice = this.totalPrice - this.supplyInvoiceIssueForm.get('rebate')?.value;
    this.supplyInvoiceIssueForm.get('totalPrice')?.setValue(this.subTotalPrice);
  }
  submitOrder() {
    if (!this.isSupplyerExist) {
      this.notificationService.showMessage(
        'WARNING!',
        'Please Add Supplyer',
        'OK',
        10000
      );
      return;
    }
    if (!this.supplyInvoiceIssueForm.valid) {
      this.notificationService.showMessage(
        'INVALID FORM!',
        'Please Input all fields',
        'OK',
        1000
      );
      return;
    }
    let orderIssueModel = this.supplyInvoiceIssueForm.value;
    orderIssueModel.supplyerId = this.supplyer.id;
    orderIssueModel.comment = this.comment;
    console.log(orderIssueModel);
    if(this.isApprovalNeeded){
      let approvalModel = {
        payload:JSON.stringify(orderIssueModel),
        createdBy: this.userName,
        taskType: Tasks.CREATE_SUPPLY,
        status: "OPEN"
      };
      const params: Map<string, any> = new Map();
      params.set('approval', approvalModel);
      this.inventoryService.sendToApproval(params).subscribe({
        next:(res)=>{
          this.notificationService.showMessage(
            'SUCCESS!',
            'Approval Sent',
            'OK',
            500
          );
          this.route.navigate(['/stock/supply-invoice-list']);
        },
        error:(err)=>{
          this.notificationService.showMessage(
            'Failed!',
            'Approval Sending Failed. '+ err.message,
            'OK',
            500
          );
        }
      })
    }else{
      const params: Map<string, any> = new Map();
      params.set('order', orderIssueModel);
      this.inventoryService.issueBuyOrder(params).subscribe({
        next: (res) => {
          console.log(res.body);
          this.notificationService.showMessage(
            'SUCCESS!',
            'Invoice Created',
            'OK',
            500
          );
          this.route.navigate(['/stock/supply-invoice-list']);
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
  calculateQuantity() {
    this.orderItem.quantityOrdered = (this.orderItem.packageQuantity * this.orderItem.unitPerPackage) + this.orderItem.looseQuantity;
    this.calculateOrder();
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
      this.filteredOptions = this.productList;
    } else {
      this.filteredOptions = this._filterCode(event.target.value);
    }
  }
}
