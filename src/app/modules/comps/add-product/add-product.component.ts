import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productAddingForm!: FormGroup;
  categories!: any[];
  units!: any[];
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
    ) {
    this.units = [
      { label: 'KG', value: 'KG' },
      { label: 'Litre', value: 'LITRE' },
      { label: 'BAG', value: 'BAG' },
      { label: 'Meter', value: 'METER' },
    ];
  }

  ngOnInit(): void {
    this.prepareForm();
  }
  prepareForm() {
    this.productAddingForm = this.formBuilder.group({
      productName: ['',[Validators.required]],
      productCategory: [''],
      unitType: ['',[Validators.required]],
      quantity: [0],
      costPricePerUnit: [0],
      sellingPricePerUnit: [0],
    });
  }
  fetchProductCategories() {
    this.categories = [{ label: 'select category', value: null }];
  }
  addProduct() {
    if (this.productAddingForm.invalid) {
      return;
    }
    let productModel = this.productAddingForm.value;
    const params:Map<string,any> = new Map();
    params.set("product",productModel);
    console.log(productModel);
    this.productService.addProduct(params).subscribe({
      next:(res)=>{
        this.productAddingForm.reset();
        this.notificationService.showMessage("SUCCESS!","Product Add Successful","OK",1000);
      },
      error:(err)=>{
        this.notificationService.showMessage("FAILED!","Product Add Failed","OK",1000);
      }
    })
  }
}
