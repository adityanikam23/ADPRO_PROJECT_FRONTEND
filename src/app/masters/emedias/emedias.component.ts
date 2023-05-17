import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-emedias',
  templateUrl: './emedias.component.html',
  styleUrls: ['./emedias.component.css']
})
export class EmediasComponent implements OnInit {
  formdata: any;

  id: any;

  emedia: any
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
      description: new FormControl("", Validators.compose([Validators.required])),
      contact: new FormControl("", Validators.compose([Validators.required])),
      vattinno: new FormControl("", Validators.compose([Validators.required])),
      csttinno: new FormControl("", Validators.compose([Validators.required])),
      gstcode: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(true),
    })

    this.api.get("emedias").subscribe((result: any) => {
      this.emedia = result;
    })

  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("emedias", data).subscribe((result: any) => {
        this.load();
        this.api.message("SAVED SUCCESSFULLY", "success");
      })
    }
    else {
      this.api.put("emedias/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success");
      })
    }
  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.id = id
    this.api.get("emedias/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        description: result.description,
        contact: result.contact,
        vattinno: result.vattinno,
        csttinno: result.csttinno,
        gstcode: result.gstcode,
        status: result.status
      });
    })


  }

  delete(id: any) {
    this.api.delete("emedias/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })
  }

}
