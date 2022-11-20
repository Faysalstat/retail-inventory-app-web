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
  OrderItem,
  Person,
  Product,
  Supplyer,
  SupplyIssueDomain,
  Tasks,
} from '../../model/models';
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
  productName = new FormControl('');
  selectedProduct = new Product();
  orderItem!: OrderItem;
  selectedOrderItem!: OrderItem;
  orderList!: any[];
  productList: any[] = [];
  filteredOptions!: Observable<Product[]>;
  unitType: string = 'UNIT';
  showLoader: boolean = false;
  errMsg: string = '';
  isApprovalNeeded : boolean = false;
  totalPrice:number = 0;
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
    this.getConfig("isApprovalNeeded");
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
      productName: [new FormControl('')],
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
      complete: () => {
        this.showLoader = false;
      },
    });
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
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.productList.filter((product) =>
      product.productName.toLowerCase().includes(filterValue)
    );
  }

  displayFn(product: Product): string {
    return product && product.productName ? product.productName : '';
  }
  productSelected(event: any) {
    this.selectedProduct = event.option.value;
    this.orderItem.productId = this.selectedProduct.id;
    this.orderItem.productName = this.selectedProduct.productName;
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
    this.productName = new FormControl('');
    this.initOptions();
    this.totalPrice = 0;
    this.orderList.map((elem) => {
      this.totalPrice += elem.totalOrderPrice;
    });
    this.supplyInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.supplyInvoiceIssueForm.get('totalPrice')?.setValue(this.totalPrice);
    this.calculateSummary();
  }
  onOrderSelect(event: any) {
    console.log(event);
  }
  calculateSummary() {
    this.supplyInvoiceIssueForm
      .get('duePayment')
      ?.setValue(
        this.supplyInvoiceIssueForm.get('totalPrice')?.value -
          this.supplyInvoiceIssueForm.get('amountPaid')?.value -
          this.supplyInvoiceIssueForm.get('rebate')?.value
      );
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
}
