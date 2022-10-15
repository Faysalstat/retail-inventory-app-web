export class Person {
    id!: number;
    personName!: string;
    contactNo!: string;
    personAddress!: string;
  }
export class Customer{
    id! : number;
    person!: Person;
    shopName!: string;
}