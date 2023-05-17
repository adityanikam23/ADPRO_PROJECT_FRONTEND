import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-releaseorders',
  templateUrl: './releaseorders.component.html',
  styleUrls: ['./releaseorders.component.css']
})
export class ReleaseordersComponent implements OnInit{

  clients : any;

  paystatus : any

  status : any;

  formdata : any

  emedias : any;

  constructor(private api : ApiService){

  }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.formdata = new FormGroup({

    });

    this.api.get("clients").subscribe((result : any)=>{
      this.clients = result;
    });

    this.api.get("emedias").subscribe((result : any)=>{
       this.emedias = result;
    });
   
    this.paystatus = this.api.paystatus;

    this.status = this.api.status;
  }


  clear(){
    this.formdata.value = "";
  }

 
}
