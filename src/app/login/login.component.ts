import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logindata: any;

  userdata: any;
  constructor(private api: ApiService, private route: Router) {

  }

  ngOnInit(): void {
    this.load();

    if (localStorage.getItem("usertype") != null) {
      this.route.navigate(['masters/employees']);
    }
    else {
      this.route.navigate(['/']);
    }
  }

  load() {
    this.logindata = new FormGroup({
      username: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required])),
    });

  }




  submit(data: any) {
    this.api.post("authentications/login", data).subscribe((result: any) => {
      if (result.length > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Login Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem("name", result[0].name);
        localStorage.setItem("username", result[0].username);
        localStorage.setItem("employeeid", result[0].employeeid);
        localStorage.setItem("roleid", result[0].roleid);
        localStorage.setItem("usertype", "admin");
        this.route.navigate(['masters/employees']);
      }
      else {
        {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      }

    })
  }

}
