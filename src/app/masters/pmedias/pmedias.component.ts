import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-pmedias',
  templateUrl: './pmedias.component.html',
  styleUrls: ['./pmedias.component.css']
})
export class PmediasComponent implements OnInit {

  formdata: any;

  id: any;

  pmedias: any;

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
    });

    this.api.get("pmedias").subscribe((result: any) => {
      this.pmedias = result;
    })

  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("pmedias", data).subscribe((result: any) => {
        this.load();
        this.api.message("SAVED SUCCESSFULLY", "success");
      })
    }
    else {
      this.api.put("pmedias/" + this.id, data).subscribe((result: any) => {
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
    this.api.get("pmedias/" + id).subscribe((result: any) => {
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
    this.api.delete("pmedias/" + id).subscribe((result : any)=>{
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })

  }

}
