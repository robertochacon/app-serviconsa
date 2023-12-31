import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('bills');
  }

  getAllBills(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setBills(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateBills(id: number, json: any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.post(url, json);
  }

  deleteBills(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}
