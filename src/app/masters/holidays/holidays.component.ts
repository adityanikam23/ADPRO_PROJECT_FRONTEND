import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import {Calendar} from 'calendar';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})

export class HolidaysComponent implements OnInit {

  formdata: any;

  id: any = 0;
  
  holidays : any;

  selectedMonth = new Date().getMonth() + 1;

  selectedYear = new Date().getFullYear();

  monthCalendar: any;

  dateRecords: any;

  display : any;

  selectedDate : any;
  constructor(public api : ApiService){

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.id = 0;
    this.formdata = new FormGroup({
      id: new FormControl(0),
      holidaydate: new FormControl("", Validators.compose([Validators.required])),
      details: new FormControl("", Validators.compose([Validators.required])),
      everyyear: new FormControl(false),
    });

    this.api.get("holidays").subscribe((result : any)=>{
       this.holidays = result;
       this.loadCalendar();
    })

  }

  loadCalendar() {
    let calendar = new Calendar();
    this.monthCalendar = calendar.monthDays(Number(this.selectedYear), Number(this.selectedMonth));
    this.dateRecords = new Array(this.monthCalendar.length);
    for(let i = 0; i < this.monthCalendar.length; i++) {
      this.dateRecords[i] = new Array(this.monthCalendar[i].length);
    }
    for (let i = 0; i < this.monthCalendar.length; i++) {
      for (let j = 0; j < this.monthCalendar[i].length; j++) {
        this.dateRecords[i][j] = 0;
      }
    }
    this.holidays.forEach((element: any) => {
      let holidayDate = new Date(element.holidaydate);
      for (let i = 0; i < this.monthCalendar.length; i++) {
        for (let j = 0; j < this.monthCalendar[i].length; j++) {
          if (this.monthCalendar[i][j] != 0) {
            let date = new Date(Number(this.selectedYear), Number(this.selectedMonth) - 1, this.monthCalendar[i][j]);
            if(element.everyyear)
              holidayDate.setFullYear(date.getFullYear());
            if (date.getFullYear() == holidayDate.getFullYear() && date.getMonth() == holidayDate.getMonth() && date.getDate() == holidayDate.getDate()) {
              this.dateRecords[i][j] += 1;
            }
          }
        }
      }
    });
    console.log(this.dateRecords);

  }



  submit(data: any) {
    if(this.id == 0){
      this.api.post("holidays", data).subscribe((result : any)=>{
        this.load();
        this.api.message("DATA SAVED SUCCESSFULLY", "success");
      })
    }
    else{
      this.api.put("holidays/" + this.id, data).subscribe((result : any)=>{
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
    this.api.get("holidays/" + id).subscribe((result : any)=>{
       this.formdata.patchValue({
         id : result.id,
         details : result.details,
         holidaydate : result.holidaydate,
         everyyear : result.everyyear,
       });
    })
  }

  delete(id: any) {
    this.api.delete("holidays/" + id).subscribe((result : any)=>{
      this.load();
      this.api.message("DATA DELETED SUCCESSFULLY", "error");
    })

  }

  openmodel(){
    this.display = "block";

  }

  closeModal(){
    this.display = "none";
  }

}
