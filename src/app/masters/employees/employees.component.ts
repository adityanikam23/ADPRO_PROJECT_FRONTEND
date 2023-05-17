import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  formdata: any;

  employees: any;

  id : any = 0;
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id : new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      email: new FormControl("", Validators.compose([Validators.required])),
      mobileno: new FormControl("", Validators.compose([Validators.required])),
      address: new FormControl("", Validators.compose([Validators.required])),
      isactive : new FormControl(true),
    });

    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
    });

  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("employees", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success")
      })
    }
    else {
      this.api.put("employees/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success")
      })
    }


  }

  clear() {
    this.formdata.value = "";
  }


  edit(id:any) {
    this.id = id
    this.api.get("employees/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id : result.id,
        name: result.name,
        email: result.email,
        mobileno: result.mobileno,
        address: result.address,
        isactive : result.isactive,
      })
    })

  }

  delete(id: any) {
    this.api.delete("employees/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })
  }


}
