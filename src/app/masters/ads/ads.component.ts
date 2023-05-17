import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'calendar';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  ads: any;

  months: any;

  years: any;

  selectedMonth = new Date().getMonth() + 1;

  selectedYear = new Date().getFullYear();

  monthCalendar: any;

  dateRecords: any;

  constructor(public api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.months = this.api.months;
    this.years = this.api.getyears();
    this.loadCalendar();
  }



  loadCalendar() {
    let calendar = new Calendar();
    this.monthCalendar = calendar.monthDays(Number(this.selectedYear), Number(this.selectedMonth));
    this.dateRecords = new Array(this.monthCalendar.length);
    for (let i = 0; i < this.monthCalendar.length; i++) {
      this.dateRecords[i] = new Array(this.monthCalendar[i].length);
    }
    for (let i = 0; i < this.monthCalendar.length; i++) {
      for (let j = 0; j < this.monthCalendar[i].length; j++) {
        this.dateRecords[i][j] = 0;
      }
    }

    console.log(this.dateRecords);

  }




}
