import { Component, Input, OnInit } from '@angular/core';
import { ReceiptBody } from '../../model/models';

@Component({
  selector: 'app-printable-receipt',
  templateUrl: './printable-receipt.component.html',
  styleUrls: ['./printable-receipt.component.css']
})
export class PrintableReceiptComponent implements OnInit {
  @Input() receiptModel:ReceiptBody;
  shopName:string;
  shopAddress!:string;
  shopContactNo!:string;
  tnxDate:Date = new Date();

  constructor() {
    this.receiptModel = {
      invoiceNo:"INV0001",
      customerName: "Customer Name",
      cutomerContact: "0192831233",
      orders:[
        {item:"Casual Shirt",rate:1500,qty:1,total:1500},
        {item:"Casual Pant",rate:2500,qty:1,total:2500},
        {item:"Formal Shirt",rate:500,qty:2,total:1000},
        {item:"Formal Shirt",rate:750,qty:2,total:1500},
      ],
      subTotal:6500,
      tax:300,
      discount:0,
      total:6800,
      issuedBy: localStorage.getItem('personName') || ""
    };
    this.shopName = localStorage.getItem('shopName') || "";
    this.shopAddress = localStorage.getItem('shopAddress') || "";
    this.shopContactNo = localStorage.getItem('shopContactNo') || "";
  }

  ngOnInit(): void {
  }
  printReport() {
  }
}
