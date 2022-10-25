import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  showLoader: boolean = false;
  stockIssueFrame!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
