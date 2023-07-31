import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('services');
  }

  getAllServices(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setServices(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateServices(id: number, json: any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.post(url, json);
  }

  deleteServices(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}
