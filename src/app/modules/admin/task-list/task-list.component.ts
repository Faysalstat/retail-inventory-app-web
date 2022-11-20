import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { NotificationService } from '../../services/notification-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  taskList:any[] = [];
  constructor(
    private inventoryService: InventoryService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchAllTaskList();
  }
  fetchAllTaskList(){
    const params: Map<string, any> = new Map();
    this.inventoryService.fetchTaskList(params).subscribe({
      next:(res)=>{
        this.taskList = res.body.data;
      },
      error:(err)=>{
        this.notificationService.showMessage("ERROR","Task List Fetch Failed. Error: "+ err.message,"OK",500);
      }
    })
  }
  openTask(task:any){
    console.log(task);
    this.router.navigate(["/admin/task-details",task.id]);
  }
}
