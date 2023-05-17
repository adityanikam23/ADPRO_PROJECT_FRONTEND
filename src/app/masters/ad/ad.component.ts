import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css']
})
export class AdComponent implements OnInit{

  formdata: any;

  id: any;

  ads: any

  clients: any;

  pmedia: any;

  constructor(private api : ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      clientid: new FormControl(0),
      pmediaid: new FormControl(0),
      addate: new FormControl("", Validators.compose([Validators.required])),
      description: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(false),
      scheduled: new FormControl("", Validators.compose([Validators.required])),
      rono: new FormControl("", Validators.compose([Validators.required]))
    });

    this.api.get("clients").subscribe((result: any) => {
      this.clients = result;
    });

    this.api.get("pmedias").subscribe((result: any) => {
      this.pmedia = result;
    });

    this.api.get("ads").subscribe((result: any) => {
      this.ads = result;
    })

  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("ads", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success")
      })
    }
    else {
      this.api.put("ads/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success")
      })
    }
  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.id = id;
    this.api.get("ads/" + id).subscribe((result: any) => {
      console.log(result);

      this.formdata.patchValue({
        id: result.id,
        clientid: result.clientid,
        pmediaid: result.pmediaid,
        addate: result.addate,
        description: result.description,
        status: result.status,
        scheduled: result.scheduled,
        rono: result.rono
      });
    });
  }

  delete(id: any) {
    this.api.delete("ads/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    });
  }
}
