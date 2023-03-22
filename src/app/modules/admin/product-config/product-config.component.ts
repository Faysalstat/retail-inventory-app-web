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
  periods!: any[];
  packagingCategories!: any[];
  brandNames!: any[];
  periodTypes!: any[];
  units!: any[];
  showLoader:boolean = false;
  isEdit:boolean = false;
  product!:any;
  errMsg:string ='';
  period:number =0;
  periodType:string = "MONTH"
  constructor(
    private activatedRoute:ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private route : Router
    ) {
      this.periodTypes = [
        {label:"Month",value:"MONTH"},
        {label:"Year",value:"YEAR"},
      ]
     }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      if(parameter['id']){
        let id = parameter['id'];
        this.isEdit = true;
        this.fetchProductById(id);
        
      }else{
        this.isEdit = false;
      }
      
      
    });
    this.prepareForm();
    this.fetchProductCategory();
    this.fetchUnitType();
    this.fetchBrandName();
  }
  fetchProductById(id:any){
    this.productService.fetchProductById(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.body){
          this.product = res.body;
          this.notificationService.showMessage("SUCCESS","Product Found","OK",300);
          this.setFormValue();
          this.productAddingForm.get('productCode')?.disable();
        }
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR","Error Occured","OK",300);
      }
    })
  }
  prepareForm() {
    this.productAddingForm = this.formBuilder.group({
      productCode: ['',[Validators.required]],
      productName: ['',[Validators.required]],
      productCategory: ['',[Validators.required]],
      quantity: [0],
      brandName:['',[Validators.required]],
      mrpPerUnit: [0],
      warrantyPeriod:[0]
    });
  }
  
  fetchPackagingCategory(){
    this.packagingCategories = [{ label: 'Select category', value: '' }];
    this.productService.fetchAllPackagingCategory().subscribe({
      next:(res)=>{
        let categories = res.body;
        if(res.body){
          categories.map((elem:any)=>{
            let category = { label: elem.key, value: elem.value }
            this.packagingCategories.push(category);
        })
        }
      },
      error:(err)=>{
        this.notificationService.showMessage("FAILED!","Packaging Category Fetching Failed","OK",1000);
      }
    })
  }
  addProduct() {
    if (this.productAddingForm.invalid) {
      this.notificationService.showErrorMessage("INVALID FORM","Please Input Required Fields","OK",600);
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
          this.productAddingForm.reset();
          this.notificationService.showMessage("SUCCESS!","Product Updated Successfuly","OK",1000);
          this.product = res.body
        }
        // this.route.navigate(["/admin/product-list"]);
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
      productCode: this.product.productCode || "",
      productName: this.product.productName || "",
      productCategory: this.product.productCategory || "",
      quantity:this.product.quantity || "",
      brandName:this.product.brandName|| "",
      mrpPerUnit:this.product.mrpPerUnit || 0,
      warrantyPeriod:this.product.warrantyPeriod || 0,
    });
  }

  fetchProductCategory(){
    this.categories = [{ label: 'Select Category', value: '' }];
    this.productService.fetchAllProductCategory().subscribe({
      next:(res)=>{
        if(res.body){
          let categoryList = res.body;
          categoryList.map((elem:any)=>{
            let option = {label:elem.key,value: elem.value};
            this.categories.push(option);
          })
        }else{
          this.notificationService.showErrorMessage("ERROR","No Product Category Found","OK",500);
        }
      }
    })
  }

  fetchUnitType(){
    this.units = [{ label: 'Select Unit Type', value: '' }];
    this.productService.fetchAllUnitType().subscribe({
      next:(res)=>{
        if(res.body){
          let unitList = res.body;
          unitList.map((elem:any)=>{
            let option = {label:elem.key,value: elem.value};
            this.units.push(option);
          })
        }else{
          this.notificationService.showErrorMessage("ERROR","No Unit Type Found","OK",500);
        }
      }
    })
  }
  checkDuplicateProduct(){
    const params: Map<string, any> = new Map();
    params.set("code",this.productAddingForm.get('productCode')?.value);
    params.set("name",'');
    if(!this.isEdit){
      this.productService.fetchProductByCode(params).subscribe({
        next:(res)=>{
          if(res.isExist){
            this.productAddingForm.get('productName')?.disable();
            this.productAddingForm.get('productCategory')?.disable();
            this.productAddingForm.get('unitType')?.disable();
            this.productAddingForm.get('quantity')?.disable();
            this.productAddingForm.get('brandName')?.disable();
            this.productAddingForm.get('costPricePerUnit')?.disable();
            this.productAddingForm.get('sellingPricePerUnit')?.disable();
            this.productAddingForm.get('packagingCategory')?.disable();
            this.productAddingForm.get('unitPerPackage')?.disable();
            this.errMsg = "**This Product Already Exits"
          }else{
            this.productAddingForm.get('productName')?.enable();
            this.productAddingForm.get('productCategory')?.enable();
            this.productAddingForm.get('unitType')?.enable();
            this.productAddingForm.get('quantity')?.enable();
            this.productAddingForm.get('brandName')?.enable();
            this.productAddingForm.get('costPricePerUnit')?.enable();
            this.productAddingForm.get('sellingPricePerUnit')?.enable();
            this.productAddingForm.get('packagingCategory')?.enable();
            this.productAddingForm.get('unitPerPackage')?.enable();
            this.errMsg = ""
          }
        }
      })
    }
  }
  fetchBrandName(){
    this.brandNames = [{ label: 'Select Brand Name', value: '' }];
    this.productService.fetchAllBrandName().subscribe({
      next:(res)=>{
        if(res.body){
          let brandNames = res.body;
          brandNames.map((elem:any)=>{
            let option = {label:elem.key,value: elem.value};
            this.brandNames.push(option);
          })
        }else{
          this.notificationService.showErrorMessage("ERROR","No Brand Name Found","OK",500);
        }
      }
    })
  }
}

