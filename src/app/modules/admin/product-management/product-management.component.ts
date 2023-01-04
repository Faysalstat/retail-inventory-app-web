import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css'],
})
export class ProductManagementComponent implements OnInit {
  offset: number = 0;
  limit = 5;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100, 500, 1000];
  productList!: any[];
  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private route : Router
  ) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts() {
    const params: Map<string, any> = new Map();
    this.offset = this.offset;
    params.set('offset', this.offset);
    params.set('limit', this.pageSize);
    this.productService.fetchAllProduct(params).subscribe({
      next: (res) => {
        if (res) {
          console.log(res.body)
          this.productList = res.body;
        }
      },
    });
  }
  pageChange(event:any){
    this.pageSize = event.pageSize;
    this.offset = this.pageSize * event.pageIndex;
    this.fetchAllProducts();
  }
  onselectProduct(product:any){
    this.route.navigate(["/stock/product-detail",product.id]);
  }
}
