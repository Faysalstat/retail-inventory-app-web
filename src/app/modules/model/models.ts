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
  balance!: number;
  due!: number;
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
  unitPerPackage!: number;
  packageQuantity: number = 0;
  looseQuantity: number = 0;
  quantityOrdered: number = 0;
  pricePerUnit!: number;
  totalOrderPrice!: number;
  deliveredQuantity!:number;
  deliverySchedules!:ScehduleDelivery[];
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
  customerId!: number;
  productName:string ='';
  orders!: OrderItem[];
  totalPrice!: number;
  amountPaid!: number;
  duePayment!: number;
  rebate!: number;
  newPayment!: number;
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