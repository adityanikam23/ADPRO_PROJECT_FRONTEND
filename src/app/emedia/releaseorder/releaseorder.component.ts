import { Component, OnInit } from '@angular/core';
import { DAYS_OF_WEEK } from 'angular-calendar';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-releaseorder',
  templateUrl: './releaseorder.component.html',
  styleUrls: ['./releaseorder.component.css']
})
export class ReleaseorderComponent implements OnInit {
  formdata: any;

  clients: any;

  details = new Array<any>();

  recordcount = 0;

  languages: any;

  gsties: any;

  emedia: any;

  totalspots: any;

  totalcharges: any;

  comissionpercentage: any = 0;

  dailyspots: any;

  caption: any;

  gstid: any;

  comamt: any

  gstdata: any;

  calculatedgst: any;

  gsts : any;

  formtodate : any;
  
  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
    this.load();
    this.adddetail(5);
  }

  load() {
    this.api.get("clients").subscribe((result: any) => {
      this.clients = result;
    });

    this.languages = this.api.languages;

    this.api.get("gsts").subscribe((result: any) => {
      this.gsties = result;
    });

    this.api.get("emedias").subscribe((result: any) => {
      this.emedia = result;
    })
  }

  adddetail(count: number) {
    for (let i = 0; i < count; i++) {
      this.details.push({
        id: 0,
        startdate: "",
        enddate: "",
        days: "",
        fromtime: "",
        totime: "",
        dailyspots: "",
        totalspots: 0,
        bonuspaid: "",
        caption: "",
        charges: NaN,
        duration: "",
        totalcharges: 0,
        cgst: 0,


      });

    }
  }

  valuechanged(index: number, field: string) {

    if (field == "days" || field == "dailyspots") {
      this.details[index].totalspots = this.details[index].days * this.details[index].dailyspots;
    }
    if (field == "totalspots" || field == "charges" || field == "duration") {
      this.details[index].totalcharges = this.details[index].totalspots * this.details[index].charges * this.details[index].duration / 10;
    }

    this.totalspots = 0;
    this.totalcharges = 0;
    this.details.forEach(element => {
      this.totalspots += element.totalspots;
      this.totalcharges += element.totalcharges;

    });
  }

  compercentage(event: Event) {
    this.comissionpercentage = <HTMLInputElement>event.target;
    if (this.comissionpercentage != null) {
      this.comissionpercentage = this.totalcharges * this.comissionpercentage.value / 100;
    }
    else {
      this.comissionpercentage = 0;
    }
  }

  Print() {
    window.print();
  }

  changegst(event: Event) {
    this.gstid = (<HTMLSelectElement>event.target).value;
    this.api.get("gsts/" + this.gstid).subscribe((result: any) => {
      if (result.status == true) {
        this.comamt = this.totalcharges - this.comissionpercentage;
        console.log(this.comamt);
        this.gstdata = this.comamt * result / 100;
        this.calculatedgst = this.gstdata + this.comamt;
        console.log(this.calculatedgst);

      }
    })


  }

  fromtodate(event : Event){
   this.formtodate = (<HTMLInputElement>event.target).value;
    if(this.formtodate != null){
     console.log(this.formtodate);
    }
  }


}
