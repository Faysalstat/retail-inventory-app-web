import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-unit-type',
  templateUrl: './unit-type.component.html',
  styleUrls: ['./unit-type.component.css']
})
export class UnitTypeComponent implements OnInit {
  unitType!:string;
  constructor(
    private productService: ProductService,
    private notificationService : NotificationService
  ) { }

  ngOnInit(): void {
  }

  addunitType(){
    const params: Map<string, any> = new Map();
    let model = {
      key: this.unitType,
      value: this.unitType.toUpperCase()
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
