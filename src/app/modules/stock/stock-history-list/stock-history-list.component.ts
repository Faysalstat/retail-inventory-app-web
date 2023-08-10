import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-stock-history-list',
  templateUrl: './stock-history-list.component.html',
  styleUrls: ['./stock-history-list.component.css']
})
export class StockHistoryListComponent implements OnInit {
  historyList:any[] = [];
  updateType:string = "";
  constructor(
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    this.getStockHistoryList();
  }

  getStockHistoryList(){
    let queryBody = {
      updateType: this.updateType
    }
    const params: Map<string, any> = new Map();
    params.set("query",queryBody);
    this.inventoryService.fetchStockModificationHistory(params).subscribe({
      next:(res)=>{
        console.log(res.body);
        this.historyList = res.body;
      }
    })
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
}
