import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {

  formdata: any;

  id: any;

  configurations: any;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      cname: new FormControl("", Validators.compose([Validators.required])),
      cvalue: new FormControl("", Validators.compose([Validators.required])),
    });

    this.api.get("configurations").subscribe((result: any) => {
      this.configurations = result;
    })
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("configurations", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      })
    }
    else {
      this.api.put("configurations/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success");
      })
    }

  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.id = id;
    this.api.get("configurations/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        cname: result.cname,
        cvalue: result.cvalue
      })
    })

  }


  delete(id: any) {
    this.api.delete("configurations/" + id).subscribe((result : any)=>{
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })

  }

}
