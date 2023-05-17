import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  formdata: any

  roles: any

  id:any = 0;
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

    });
    
    this.api.get("roles").subscribe((result: any) => {
      this.roles = result;      
    });
  }

  clear() {
    this.formdata.value = "";
  }

  submit(data: any) {
    if (this.id == 0) {
      this.api.post("roles", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success")
      })
    }
    else {
      this.api.put("roles/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSULLY", "success")
      })
    }

  }

  edit(id: any) {
    this.id = id;
    this.api.get("roles/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id : result.id,
        name: result.name,
      });
    })

  }



  delete(id: any) {
    this.api.delete("roles/" + id).subscribe((result: any) => {
      // Swal.fire({
      //   title: 'Are you sure?',
      //   text: "You won't be able to revert this!",
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3085d6',
      //   cancelButtonColor: '#d33',
      //   confirmButtonText: 'Yes, delete it!'
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     this.load();
      //     Swal.fire(
      //       'Deleted!',
      //       'Your file has been deleted.',
      //       'success'
      //     )
      //   }
      // })

      this.load()
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
  
    })
  }









}
