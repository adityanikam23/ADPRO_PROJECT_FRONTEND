import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usertype : any;

  constructor(private api : ApiService){

  }

  ngOnInit(): void {
    this.usertype = localStorage.getItem("usertype");


  }

  logout() {
     this.api.logout();
  }

}
