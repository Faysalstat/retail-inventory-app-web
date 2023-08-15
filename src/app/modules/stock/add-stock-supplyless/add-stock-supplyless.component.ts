import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COFIGS, OrderItem, Product, StockUpdateModel, SupplyIssueDomain, Tasks } from '../../model/models';
import { ToWords } from 'to-words';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product-service.service';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';
import { PdfMakeService } from '../../services/pdf-make.service';

@Component({
  selector: 'app-add-stock-supplyless',
  templateUrl: './add-stock-supplyless.component.html',
  styleUrls: ['./add-stock-supplyless.component.css']
})
export class AddStockSupplylessComponent implements OnInit {
  productCode ='';
  productName ='';
  selectedProduct = new Product();
  productId!:number;
  quantity: number = 0;
  quantityDamaged: number = 0;
  date: Date = new Date();
  remark!:string;
  productList: any[] = [];
  actions:any[]=[];
  filteredOptions!: any;
  unitType: string = 'UNIT';
  showLoader: boolean = false;
  errMsg: string = '';
  userName:any;
  toWords = new ToWords();
  isStockAdded: any;
  updateType:string = "ADDED"
  constructor(
    private route: Router,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
  ) {
    this.actions = [
      {label:"ADD STOCK", value:"ADDED"},
      {label:"RETURN", value:"RETURN"},
      {label:"DAMAGED", value:"DAMAGED"}
    ]
  }

  ngOnInit(): void {
    this.fetchProducts();
    this.userName = localStorage.getItem('username');
  }
  
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
    console.log(event);
    this.selectedProduct = event.option.value;
    this.productCode = this.selectedProduct.productCode;
    this.productName = this.selectedProduct.productName;
    this.productId = this.selectedProduct.id;
    this.unitType = this.selectedProduct.unitType;
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

  updateStock(){
    const params: Map<string, any> = new Map();
    let stockModel = {
      isStockAdded: this.isStockAdded,
      updateType:this.updateType,
      productId:this.productId,
      quantity: this.quantity,
      remarks: this.remark,
      issuedBy: this.userName
    }
    params.set('stockModel', stockModel);
    this.inventoryService.updateStock(params).subscribe({
      next:(res)=>{
        this.notificationService.showMessage(
          'SUCCESS!',
          res.message,
          'OK',
          1000
        );
        this.route.navigate(['/supply/supply-invoice-list']);
      },
      error:(err)=>{
        this.notificationService.showErrorMessage(
          'FAILED!',
          err.message,
          'OK',
          1000
        );
      }
    })
      
  }
}
