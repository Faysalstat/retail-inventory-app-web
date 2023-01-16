import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  balance:number = 0;
  constructor() { }

  ngOnInit(): void {
  }
  updateBalance(event:any){}
}
