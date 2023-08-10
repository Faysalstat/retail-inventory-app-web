import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product-service.service';
import { NotificationService } from '../../services/notification-service.service';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-add-stock-uantity',
  templateUrl: './add-stock-quantity.component.html',
  styleUrls: ['./add-stock-quantity.component.css'],
})
export class AddStockQuantityComponent implements OnInit {
  offset: number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  productList!: any[];
  categories: any[] = [];
  brandName: string = '';
  categoryName: string = '';
  code: string = '';
  showLoader = false;
  newQuantity = 0;
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private route: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    this.fetchProductCategory();
    this.fetchAllProducts();
  }
  fetchProductCategory() {
    this.categories = [{ label: 'Select Category', value: '' }];
    this.productService.fetchAllProductCategory().subscribe({
      next: (res) => {
        if (res.body) {
          let categoryList = res.body;
          categoryList.map((elem: any) => {
            let option = { label: elem.key, value: elem.value };
            this.categories.push(option);
          });
        } else {
          this.notificationService.showErrorMessage(
            'ERROR',
            'No Product Category Found',
            'OK',
            500
          );
        }
      },
    });
  }

  fetchAllProducts() {
    const params: Map<string, any> = new Map();
    this.offset = this.offset;
    params.set('offset', this.offset);
    params.set('limit', this.pageSize);
    params.set('brandName', this.brandName);
    params.set('categoryName', this.categoryName);
    params.set('code', this.code);
    this.productService.fetchAllProduct(params).subscribe({
      next: (res) => {
        if (res) {
          console.log(res.body);
          this.productList = res.body;
        }
      },
    });
  }
  pageChange(event: any) {
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllProducts();
  }
  onselectProduct(product: any) {
    this.route.navigate(['/supply/product-detail', product.id]);
  }
  packProduct(product: any) {
    let packQnt = '';
    let availableQuantity = product.quantity - product.quantitySold;
    if (product.unitPerPackage && product.packagingCategory) {
      packQnt =
        Math.floor(availableQuantity / product.unitPerPackage) +
        ' ' +
        product.packagingCategory +
        ' ' +
        (product.quantity % product.unitPerPackage) +
        ' ' +
        product.unitType;
    } else {
      packQnt = 'N/A';
    }
    return packQnt;
  }
  refreshFilter() {
    this.brandName = '';
    this.categoryName = '';
    this.code = '';
    this.fetchAllProducts();
  }
  updateStock(product: any, index: number) {
    this.showLoader = true;
    const params: Map<string, any> = new Map();
    params.set('product', product);
    this.inventoryService.updateStockQuantity(params).subscribe({
      next: (res) => {
        if (res.isSuccess) {
          this.notificationService.showMessage(
            'SUCCESS',
            res.message,
            'OK',
            1000
          );
          this.productList[index].quantity += product.newQuantity;
        } else {
          this.notificationService.showErrorMessage(
            'FAILED',
            res.message,
            'OK',
            1000
          );
        }
      },
      error: (err) => {
        this.notificationService.showErrorMessage(
          'FAILED',
          err.message,
          'OK',
          1000
        );
      },
      complete: () => {
        this.showLoader = false;
      },
    });
  }
}
