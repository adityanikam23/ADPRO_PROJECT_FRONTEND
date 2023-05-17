import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  formdata: any;

  employees: any;

  roles: any;

  users: any;

  id = 0;
  constructor(private api: ApiService, private router: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.load();

  }

  load() {

    this.formdata = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.compose([Validators.required])),
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
      employeeid: new FormControl(0, Validators.compose([Validators.required])),
      roleid: new FormControl(0, Validators.compose([Validators.required]))
    });

    this.api.get("employees").subscribe((result: any) => {
      this.employees = result;
    });

    this.api.get("roles").subscribe((result: any) => {
      this.roles = result;
    });


    this.api.get("users").subscribe((result: any) => {
      this.users = result;
    })

  }


  submit(data: any) {
    if (this.id == 0) {
      this.api.post("users", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success")
      })
    }
    else {
      this.api.put("users/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success")
      });
    }


  }

  clear() {
    this.formdata.value = "";
  }


  delete(id: any) {
    this.api.delete("users/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    });
  }

  edit(id: any) {
    this.id = id;
    this.api.get("users/" + id).subscribe((result: any) => {
      console.log(result);

      this.formdata.patchValue({
        id: result.id,
        name: result.name,
        username: result.username,
        password: result.password,
        employeeid: result.employeeid,
        roleid: result.roleid
      })
    })
  }

}
