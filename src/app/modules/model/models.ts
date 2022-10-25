export class Person {
  id!: number;
  personName!: string;
  contactNo!: string;
  personAddress!: string;
}
export class Customer {
  id!: number;
  person!: Person;
  shopName!: string;
}

export class Supplyer {
  id!: number;
  person!: Person;
  shopName!: string;
  regNo!:string;
}

export class Product {
  id!: number;
  productName!: string;
  unitType!: string;
  quantity!: number;
  costPricePerUnit!: number;
  sellingPricePerUnit!: number;
}
export class OrderItem {
  id!: number;
  productId!: number;
  productName!: string;
  unitType!: string;
  quantityOrdered!: number;
  sellingPricePerUnit!: number;
  totalOrderPrice!: number;
  deliveredQuantity!:number;
  deliverySchedules!:ScehduleDelivery[];
}
export class ScehduleDelivery{
  id!:number;
  deliverableQuantity!: number;
  
  orderId!:number;
  scheduledDate!: string;
  status!:string;
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