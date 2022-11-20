import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-approval-details',
  templateUrl: './approval-details.component.html',
  styleUrls: ['./approval-details.component.css'],
})
export class ApprovalDetailsComponent implements OnInit {
  taskId!: any;
  taskDetail!: any;
  invoiceDetails!: any;
  supplyer!:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private inventoryService: InventoryService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.fetchPayloadByTaskId();
  }

  fetchPayloadByTaskId() {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];
      this.taskId = id;
      console.log(parameter);
      this.inventoryService.fetchTaskById(this.taskId).subscribe({
        next: (res) => {
          console.log(res.body);
          this.taskDetail = res.body;
          this.invoiceDetails = res.body.payload;
          this.fetchClientById(res.body);
        },
      });
    });
  }

  fetchClientById(taskDetail:any) {
    
    if (taskDetail.taskType == 'CREATE_SUPPLY') {
      const params: Map<string, any> = new Map();
      params.set('id',taskDetail.payload.supplyerId);
      params.set('code', '');
      this.clientService.getSupplyerByCode(params).subscribe({
        next: (res) => {
          if (res.body) {
            console.log(res.body);
            this.supplyer = res.body;
          }
        },
      });
    } else {
    }
  }
}
