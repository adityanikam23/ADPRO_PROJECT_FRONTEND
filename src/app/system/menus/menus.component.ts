import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  formdata: any

  menus: any;

  parentmenus: any;

  id: any = 0;
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
      link: new FormControl("", Validators.compose([Validators.required])),
      icon: new FormControl("", Validators.compose([Validators.required])),
      srno: new FormControl("", Validators.compose([Validators.required])),
      canhavechild: new FormControl(false),
      parentmenuid: new FormControl("0", Validators.compose([Validators.required])),
    });

    this.api.get("menus").subscribe((result : any) => {
      this.menus = result;
      this.parentmenus = result.filter((menu : any) => {
        if (menu.canhavechild == true) {
          menu["childs"] = this.menus.filter((m : any) => {
            if (m.parentmenuid == menu.id) {
              return m;
            }
          });
          return menu;
        }
      })
    })


  }


  submit(data: any) {
    if (this.id == 0) {
      this.api.post("menus", data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      })
    }
    else {
      this.api.put("menus/" + this.id, data).subscribe((result: any) => {
        this.load();
        this.api.message("DATA EDITED SUCCESSFULLY", "success")
      })
    }


  }

  clear() {
    this.formdata.value = "";
  }

  edit(id: any) {
    this.id = id
    this.api.get("menus/" + id).subscribe((result: any) => {
      this.formdata.patchValue({
        id: result.id,
        title: result.title,
        link: result.link,
        icon: result.icon,
        srno: result.srno,
        canhavechild: result.canhavechild,
        parentmenuid : result.parentmenuid,
      });
    })

  }

  delete(id: any) {
    this.api.delete("menus/" + id).subscribe((result: any) => {
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })

  }

}
