import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../services/notification-service.service';
import { ProductService } from '../../services/product-service.service';

@Component({
  selector: 'app-product-config',
  templateUrl: './product-config.component.html',
  styleUrls: ['./product-config.component.css']
})
export class ProductConfigComponent implements OnInit {
  productAddingForm!: FormGroup;
  categories!: any[];
  packagingCategories!: any[];
  units!: any[];
  showLoader:boolean = false;
  isEdit:boolean = false;
  product!:any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private route : Router
    ) {
    this.units = [
      { label: 'KG', value: 'KG' },
      { label: 'Litre', value: 'LITRE' },
      { label: 'BAG', value: 'BAG' },
      { label: 'Meter', value: 'METER' },
    ];

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if(parameter['id']){
        let id = parameter['id'];
        this.isEdit = true;
        this.fetchProductById(id);
        
      }else{
        this.isEdit = false;
        console.log("create");
      }
      
      
    });
    this.prepareForm();
    this.fetchPackagingCategory();
  }
  fetchProductById(id:any){
    this.productService.fetchProductById(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.body){
          this.product = res.body;
          this.notificationService.showMessage("SUCCESS","Product Found","OK",300);
          this.setFormValue();
        }
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR","Error Occured","OK",300);
      }
    })
  }
  prepareForm() {
    this.productAddingForm = this.formBuilder.group({
      productName: ['',[Validators.required]],
      productCategory: [''],
      unitType: ['',[Validators.required]],
      quantity: [0],
      brandName:[''],
      costPricePerUnit: [0],
      sellingPricePerUnit: [0],
      packagingCategory:[''],
      unitPerPackage:[0]
    });
  }
  fetchProductCategories() {
    this.categories = [{ label: 'select category', value: null }];
  }
  fetchPackagingCategory(){
    this.packagingCategories = [{ label: 'Select category', value: null }];
    this.productService.fetchAllPackagingCategory().subscribe({
      next:(res)=>{
        let categories = res.body;
        if(res.body){
          categories.map((elem:any)=>{
            let category = { label: elem.categoryName, value: elem.categoryName }
            this.packagingCategories.push(category);
        })
        }
       
      },
      error:(err)=>{
        this.notificationService.showMessage("FAILED!","Category Fetching Failed","OK",1000);
      }
    })
  }
  addProduct() {
    
    if (this.productAddingForm.invalid) {
      return;
    }
    this.showLoader = true;
    let productModel = this.productAddingForm.value;
    productModel.isEdit = this.isEdit;
    const params:Map<string,any> = new Map();
    params.set("product",productModel);
    console.log(productModel);
    this.productService.addProduct(params).subscribe({
      next:(res)=>{
        if(res.isUpdated){
          this.productAddingForm.reset();
          this.notificationService.showMessage("SUCCESS!","Product Added Successfuly","OK",1000);
        }else{
          this.notificationService.showMessage("SUCCESS!","Product Updated Successfuly","OK",1000);
          this.product = res.body
        }
        this.route.navigate(["/admin/product-list"]);
      },
      error:(err)=>{
        this.notificationService.showMessage("FAILED!","Product Add Failed","OK",1000);
      },
      complete:()=>{
        this.showLoader = false;
      }
    })
  }
  setFormValue(){
    this.productAddingForm = this.formBuilder.group({
      id: this.product.id,
      productName: this.product.productName || "",
      productCategory: this.product.productCategory || "",
      unitType: this.product.unitType || "",
      quantity:this.product.quantity || "",
      brandName:this.product.brandName|| "",
      costPricePerUnit:this.product.costPricePerUnit|| "",
      sellingPricePerUnit:this.product.sellingPricePerUnit|| "",
      packagingCategory:this.product.packagingCategory|| "",
      unitPerPackage:this.product.unitPerPackage|| "",
    });
  }
}

