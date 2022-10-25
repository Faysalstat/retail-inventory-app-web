import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { OrderItem, Person, Product, Supplyer, SupplyIssueDomain } from '../../model/models';
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
  constructor(
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
      amountPaid: [formData.amountPaid],
      duePayment: [formData.duePayment],
      rebate: [formData.rebate],
      newPayment: [formData.newPayment],
      comment: [formData.comment],
    });
  }
  searchSupllyer() {
    this.clientService
      .getClientByContactNo(this.person.contactNo)
      .subscribe({
        next: (res) => {
          if (res.body) {
            this.notificationService.showMessage("SUCCESS!","Person Found","OK",2000);
            this.person = res.body;
            // this.supplyer.person = this.person;
            if(res.body.supplyer){
              this.supplyer = res.body.supplyer;
              this.isSupplyerExist = true;
            }else{
              this.errMsg = "** This person is not a Customer, Please Add as a Customer"
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
        error:(err)=>{
          this.isSupplyerExist = false;
          console.log(err.message);
          this.notificationService.showMessage("ERROR!","Customer Found Failed" + err.message,"OK",2000);
        },
        complete: () => {},
      });
  }
  addSupplyer() {
    const params: Map<string, any> = new Map();
    let supplyerModel = {
      personId: this.person.id,
      clientType: 'SUPPLYER',
      personName: this.person.personName,
      contactNo: this.person.contactNo,
      personAddress: this.person.personAddress,
      shopName: this.supplyer.shopName,
      regNo: this.supplyer.regNo
    };
    params.set('client', supplyerModel);

    this.clientService.addClient(params).subscribe({
      next: (res) => {
        if (res.body) {
          this.isSupplyerExist = true;
          this.supplyInvoiceIssueForm.get('supplyerId')?.setValue(res.body.id);
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
  productSelected(product: any) {
    this.selectedProduct = product;
    this.orderItem.productId = product.id;
    this.orderItem.productName = product.productName;
    this.orderItem.unitType = product.unitType;
    this.orderItem.sellingPricePerUnit = product.sellingPricePerUnit;
    this.unitType = product.unitType;
    console.log(this.selectedProduct);
  }
  calculateOrder() {
    this.orderItem.totalOrderPrice =
      this.orderItem.quantityOrdered * this.orderItem.sellingPricePerUnit;
  }
  addSupplyOrder() {
    if (
      !this.orderItem.productId ||
      !this.orderItem.quantityOrdered ||
      !this.orderItem.sellingPricePerUnit
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
    this.supplyInvoiceIssueForm.get('orders')?.setValue(this.orderList);
    this.supplyInvoiceIssueForm.get('totalPrice')?.setValue(totalPrice);
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
    if(!this.isSupplyerExist){
      this.notificationService.showMessage("WARNING!","Please Add Supplyer","OK",10000);
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
    console.log(orderIssueModel);
    const params: Map<string, any> = new Map();
    params.set('order', orderIssueModel);
    this.inventoryService.issueBuyOrder(params).subscribe({
      next:(res)=>{
        console.log(res.body);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
