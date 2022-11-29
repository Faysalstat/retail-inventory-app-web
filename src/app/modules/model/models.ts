export class Person {
  id!: number;
  customer!:Customer;
  personName!: string;
  contactNo!: string;
  personAddress!: string;
}
export class Customer {
  id!: number;
  person!: Person;
  account!:Account;
  shopName!: string;
}

export class Supplyer {
  id!: number;
  person!: Person;
  account!:Account;
  code!:string;
  companyName!: string;
  brand!: string;
  shopName!: string;
  regNo!:string;
}
export class Account {
  id!: number;
  balance: number = 0;
  due: number=0;
  amountToPay!: number;
  accountType!: number;
}
export class Product {
  id!: number;
  productName!: string;
  unitType!: string;
  quantity!: number;
  costPricePerUnit!: number;
  sellingPricePerUnit!: number;
  packagingCategory!: string;
  unitPerPackage!: number;
}
export class OrderItem {
  id!: number;
  productId!: number;
  productName!: string;
  unitType!: string;
  packagingCategory!: string;
  unitPerPackage: number = 0;
  packageQuantity: number = 0;
  looseQuantity: number = 0;
  quantityOrdered: number = 0;
  pricePerUnit: number = 0;
  totalOrderPrice!: number;
  deliveredQuantity!:number;
  deliverySchedules!:ScehduleDelivery[];
  quantity:number = 0;
}
export class ScehduleDelivery{
  id!:number;
  deliverableQuantity!:number;
  scheduledDate: Date = new Date();
  deliveryStatus!: string;
  state!: string;
  orderId!:number;
}

export class OrderIssueDomain {
  id!: number;
  doNo!: string;
  invoiceNo!:string;
  customerId!: number;
  accountId!: number;
  productName:string ='';
  orders!: OrderItem[];
  totalPrice!: number;
  previousBalance!:number;
  totalPayableAmount!: number;
  totalPaidAmount!: number;
  duePayment!: number;
  rebate!:number;
  paymentMethod!:string;
  comment!: string;
}
export class SupplyIssueDomain {
  id!: number;
  supplyerId!: number;
  productName:string ='';
  orders!: OrderItem[];
  schedules!:ScehduleDelivery[];
  
  totalPrice!: number;
  amountPaid!: number;
  duePayment!: number;
  rebate!: number;
  newPayment!: number;
  comment!: string;
}

export enum Tasks{
  CREATE_INVOICE="CREATE_INVOICE",
  UPDATE_INVOICE= "UPDATE_INVOICE",
  CREATE_SUPPLY= "CREATE_SUPPLY",
  UPDATE_SUPPLY= "UPDATE_SUPPLY",
  CASH_HANDOVER = "CASH_HANDOVER"
}


export enum COFIGS{
  STOCK_APPROVAL_NEEDED = "STOCK_APPROVAL_NEEDED",
  SALE_APPROVAL_NEEDED = "SALE_APPROVAL_NEEDED"
}