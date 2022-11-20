import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  cashForm!: FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.prepareForm();
  }
  prepareForm() {
    this.cashForm = this.formBuilder.group({
      id: [''],
      clientName: [''],
      accountId:[''],
      balance: [''],
      tnxAmount: ['']
    });
  }
  doTransaction(){}
}
