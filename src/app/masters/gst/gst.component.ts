import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {

  formdata: any

  id: any = 0;

  gsties: any;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }
  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      title: new FormControl("", Validators.compose([Validators.required])),
      cgst: new FormControl("", Validators.compose([Validators.required])),
      sgst: new FormControl("", Validators.compose([Validators.required])),
      igst: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(true),
      gstcode: new FormControl("", Validators.compose([Validators.required]))
    });

    this.api.get("gsts").subscribe((result: any) => {
      this.gsties = result;
    })
  }

  submit(data: any) {
    if(this.id == 0){
      this.api.post("gsts", data).subscribe((result : any)=>{
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      })
    }
    else{
      this.api.put("gsts/" + this.id, data).subscribe((result : any)=>{
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success");
      })
    }
  }

  clear() {
    this.formdata.value = ""
  }

  edit(id : any) {
    this.id = id;
    this.api.get("gsts/" + id).subscribe((result : any)=>{
      this.formdata.patchValue({
        id : result.id,
        title : result.title,
        cgst : result.cgst,
        sgst : result.sgst,
        igst : result.igst,
        status : result.status,
        gstcode : result.gstcode,
      })
      
    })

  }

  delete(id : any) {
     this.api.delete("gsts/" + id).subscribe((result : any)=>{
       this.load();
       this.api.message("DATA DELETED SUCCESSFULLY", "error");
     })
  }

}
