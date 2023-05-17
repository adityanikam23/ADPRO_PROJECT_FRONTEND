import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  parentmenus : any;

  roleid : any;

  menus : any;

  constructor(private api: ApiService) { 
    this.roleid = localStorage.getItem("roleid");
  }

  ngOnInit(): void {

    // this.api.get("menus").subscribe((result : any) => {
    //   this.menus = result;
    //   this.parentmenus = result.filter((menu : any) => {
    //     if (menu.canhavechild == true) {
    //       menu["childs"] = this.menus.filter((m : any) => {
    //         if (m.parentmenuid == menu.id) {
    //           return m;
    //         }
    //       });
    //       return menu;
    //     }
    //   })
    // });

   

    this.api.get("roles/menus/" + this.roleid).subscribe((result: any) => {
      result.filter((pm: any) => {
         this.api.get("menus").subscribe((menu: any) => {
             menu.filter((p:any)=>{
               if(p.id==pm.menuid){
                 pm["title"]=p.title;
               }
             })
           pm["childs"] = menu.filter((m: any) => {
                 if (m.parentmenuid == pm.menuid) {        
                   return m;
                 }
             })   
             return menu;
         })
       })
       this.parentmenus=result;
  })

  }

}
