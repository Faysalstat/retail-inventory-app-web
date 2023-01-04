import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  category!:string;
  constructor(
    private productService: ProductService,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {
  }

  addcategory(){
    const params: Map<string, any> = new Map();
    let model = {
      key: this.category,
      value: this.category.toUpperCase()
    }
    params.set("model",model);
    this.productService.addProductCategory(params).subscribe({
      next:(res)=>{
        if(res.body){
          this.notificationService.showMessage("SUCCESS",res.message,"OK",500);
        }
      }
    })
  }

}

