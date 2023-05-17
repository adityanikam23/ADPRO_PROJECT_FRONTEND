import { HttpClient } from '@angular/common/http';
import { Injectable, ReflectiveInjector } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "https://localhost:7129/api/";

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  
  weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  languages = ["Marathi", "Hindi", "English", "Kannad"];

  paystatus = ["Partially", "Fully", "Not Paid"];

  status = ["Not Billed", "Billed", "Cancelled"];

  constructor(private http: HttpClient, private route: Router) { }

  getyears(){
    let years = new Array();
    for(let year = 2023; year < 2030; year++){
      years.push(year)
    }
    return years;
  }


  get(url: string) {
    return this.http.get(this.baseurl + url);
  }

  post(url: string, data: any) {
    return this.http.post(this.baseurl + url, data);
  }

  put(url: string, data: any) {
    return this.http.put(this.baseurl + url, data);
  }

  delete(url: string) {
    return this.http.delete(this.baseurl + url);
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/']);

  }

  message(title : any, icon : any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: icon,
      title: title,
    })

  }
}
