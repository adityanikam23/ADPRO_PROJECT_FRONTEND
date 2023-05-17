import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  formdata: any;

  id : any = 0;

  clients: any;
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      gstcode: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(true),
    })

    this.api.get("clients").subscribe((result: any) => {
      this.clients = result;
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("clients", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      });
    }
    else {
      this.api.put("clients/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success");
      });
    }
  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.id = id;
    this.api.get("clients/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id : result.id,
        name: result.name,
        gstcode: result.gstcode,
        mobileno: result.mobileno,
        address: result.address,
        status: result.status,
      })
    })
  }

  delete(id: any) {
    this.api.delete("clients/" + id).subscribe((result : any)=>{
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })
  }

}
