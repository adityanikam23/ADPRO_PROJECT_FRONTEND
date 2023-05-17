import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-rolemenumapping',
  templateUrl: './rolemenumapping.component.html',
  styleUrls: ['./rolemenumapping.component.css']
})
export class RolemenumappingComponent implements OnInit {
  roles: any;

  roleid = 0;

  menus: any;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.api.get("roles").subscribe((result: any) => {
      this.roles = result;
    });
  }

  roleChanged() {
    if (this.roleid != 0) {
      this.api.get("menus").subscribe((result: any) => {
        let tempmenus = result.filter((menu: any) => {
          if (menu.canhavechild == true) {
            menu["rolemenuid"] = 0;
            return menu;
          }
        });
        this.api.get("roles/menus/" + this.roleid).subscribe((result: any) => {
          this.menus = tempmenus.map((menu: any) => {
            let found = false;
            for (let i = 0; i < result.length; i++) {
              if (menu.id == result[i].menuid) {
                console.log("Found");

                menu["rolemenuid"] = result[i].id;
                found = true;
                break;
              }
            }
            if (!found) {
              menu["rolemenuid"] = 0;
            }
            return menu;
          });
        });
      })
    }
    else {
      this.menus = [];
    }
  }


  changeMenu(rolemenuid: number, menuid: number, event: Event) {

    let ctrl = <HTMLInputElement>event.target;
    if (ctrl.checked) {
      this.api.post("roles/add/" + this.roleid + "/" + menuid, null).subscribe((result: any) => {
        console.log(result);
      });
    }
    else {
      this.api.post("roles/remove/" + rolemenuid, null).subscribe((result: any) => {
        console.log(result);
      });
    }
  }
}


