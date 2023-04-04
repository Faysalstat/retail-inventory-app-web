import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  userProfile!:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.userProfile = localStorage.getItem('username');
  }
  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['auth']);
  }

}
