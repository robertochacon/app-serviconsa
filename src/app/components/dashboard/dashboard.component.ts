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
      
      this.tqd = response.data.quote[0][0].day!=null?response.data.quote[0][0].day:0;
      this.tqw = response.data.quote[1][0].week!=null?response.data.quote[1][0].week:0;
      this.tqm = response.data.quote[2][0].month!=null?response.data.quote[2][0].month:0;

      this.tid = response.data.invoice[0][0].day!=null?response.data.invoice[0][0].day:0;
      this.tiw = response.data.invoice[1][0].week!=null?response.data.invoice[1][0].week:0;
      this.tim = response.data.invoice[2][0].month!=null?response.data.invoice[2][0].month:0;

      this.loading = false;
      
    }, error=>{
        this.loading = false;
    })

  }

}
