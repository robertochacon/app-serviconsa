import { Component, Input, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loading = false;
  name: any = '';
  tid = 0;
  tiw = 0;
  tim = 0;
  tqd = 0;
  tqw = 0;
  tqm = 0;

  @Input() page: string = 'dashboard';
  constructor(private _home: HomeService) { 
    this.name = localStorage.getItem('name');
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(){
    this.loading = true;

    this._home.getDashboard().subscribe((response)=>{

      this.tqd = response.data.quote[0][0].day;
      this.tqw = response.data.quote[0][1].week;
      this.tqm = response.data.quote[0][2].month;

      this.tid = response.data.invoice[0][0].day;
      this.tiw = response.data.invoice[0][1].week;
      this.tim = response.data.invoice[0][2].month;

      this.loading = false;
      
    }, error=>{
        this.loading = false;
    })

  }

}
