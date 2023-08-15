import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  @Input() previewDetails!: any;
  @Output() confirmSaleEvent = new EventEmitter<string>();
  constructor(
  
  ) {}

  ngOnInit(): void {

  }

  applyFilter(date: any) {
    let newDate = new Date(date);
    return (
      newDate.getDate() +
      '/' +
      (newDate.getMonth() + 1) +
      '/' +
      newDate.getFullYear()
    );
  }

  showPositive(number: any) {
    return Math.abs(Number(number));
  }

  confirm(event:any){
    this.confirmSaleEvent.emit(event);
  }
}
