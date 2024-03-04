import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person, UserModel } from '../../model/models';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/authService';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  disable!:true;
  message:string = "";
  selectedRole!:string;
  roles!:any[];
  isExist:boolean = false;
  showLoader: boolean = false;
  userList: any[] = [];
  query!:any;
  selectedUser!:any;
  oldPassword!:any;
  newPassword!:any;
  constructor(
    private formBuilder: FormBuilder,
    private adminService:AdminService,
    private authService : AuthService,
    private clientService : ClientService,
    private notificationService : NotificationService
  ) {
    this.query = {
      username:""
    }
    this.roles = [
      {roleName:"ADMIN"},
      {roleName:"MANAGER"},
      {roleName:"SALER"}
    ]
   }

  ngOnInit(): void {
    this.prepareForm(null);
    this.fetchUserList();
  }
  prepareForm(formData: any) {
    formData = new UserModel();
    this.userForm = this.formBuilder.group({
      id: [formData.id ? formData.id : null],
      personId: [formData.id ? formData.id : null],
      personName: [formData.personName, [Validators.required]],
      email: [formData.email, [Validators.required]],
      contactNo: [formData.contactNo, [Validators.required],],
      personAddress: [formData.personAddress],
      loginUserName:[formData.loginUserName,[Validators.required]],
      loginUserPassword:[formData.loginUserPassword,[Validators.required]],
      userRole:[formData.userRole,[Validators.required]],
    });
  }
  searchCustomer(){
    this.showLoader = true;
    console.log("Change Detected");
    this.clientService.getClientByContactNo(this.userForm.get('contactNo')?.value).subscribe({
      next:(res)=>{
        if(res.body){
          this.message= "This person is in our database";
          this.userForm.get('personId')?.setValue(res.body?.id);
          this.userForm.get('personName')?.setValue(res.body?.personName);
          this.userForm.get('personAddress')?.setValue(res.body?.personAddress);
          this.userForm.get('email')?.setValue(res.body?.email);
          this.message = "* This contact already exists in database! "
        }
        else{
          this.userForm.get('personId')?.setValue(0);
          this.userForm.get('name')?.enable();
          this.userForm.get('address')?.enable();
          this.userForm.get('loginUserPassword')?.enable();
          return;
        }
      },
      error:(err)=>{
        console.log(err.message);
        this.notificationService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{
        this.showLoader = false;
      }
    })
  }
  onChangeRole(){

  }
  checkUser(){
    this.showLoader = true;
    let userName = this.userForm.get('loginUserName')?.value;
    this.authService.checkExistingUser(userName).subscribe({
      next:(res)=>{
        this.isExist = res.body;
        this.message = res.message;
      },
      error:(err)=>{
        console.log(err.message);
        this.notificationService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete:()=>{
        this.showLoader = false;
      }
    })
  }
  submit() {
    this.showLoader = true;
    const params:Map<string,any> = new Map();
    console.log(this.userForm.value);
    if(this.userForm.invalid){
      return;
    }
    const user = this.userForm.value;
    params.set("user",user);
    this.authService.addUser(params).subscribe({
      next:(res)=>{
        this.prepareForm(null);
        this.notificationService.showMessage("SUCCESS!","Operation Successfull!","OK",2000);
        this.fetchUserList();
      },
      error:(err)=>{
        console.log(err.message);
        this.notificationService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{
        this.showLoader = false;
      }
    })
  }
  fetchUserList(){
    this.authService.getAllUser(this.query.username).subscribe({
      next:(res)=>{
        this.userList = res.body;
      },
      error:(err)=>{
        this.notificationService.showErrorMessage("ERROR",err.message,"OK",300);
      }
    })
  }
  onSelectUser(user:any){
    this.selectedUser = user;
  }
  changePassword(){
    let userModel = {
      userId:this.selectedUser.id,
      oldPassword:this.oldPassword,
      newPassword:this.newPassword
    }
    const params:Map<string,any> = new Map();
    params.set("user",userModel);
    this.authService.updateUser(params).subscribe({
      next:(res)=>{
        this.notificationService.showMessage("SUCCESS!","Operation Successfull!","OK",2000);
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR!","Operation Failed" + err.message,"OK",2000);
      },
      complete: ()=>{
        this.showLoader = false;
      }
    })
  }

}
