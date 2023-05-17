import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  formdata: any;

  id: any = 0;

  employees: any;

  jobs: any
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.formdata = new FormGroup({
      id: new FormControl(0),
      employeeid: new FormControl(0),
      worktitle: new FormControl("", Validators.compose([Validators.required])),
      workdescription: new FormControl("", Validators.compose([Validators.required])),
      workremark: new FormControl("", Validators.compose([Validators.required])),
      workdate: new FormControl("", Validators.compose([Validators.required])),
      status: new FormControl(true),
    });

    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
    })

    this.api.get("jobs").subscribe((result: any) => {
      this.jobs = result;
    })

  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("jobs", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      });
    }
    else {
      this.api.put("jobs/" + this.id, data).subscribe((result: any) => {
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
    this.api.get("jobs/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        employeeid: result.employeeid,
        worktitle: result.worktitle,
        workdescription: result.workdescription,
        workremark: result.workremark,
        workdate: result.workdate,
        status: result.status
      });
    });

  }

  delete(id: any) {
    this.api.delete("jobs/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })
  }

}
