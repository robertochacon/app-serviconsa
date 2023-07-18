import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('suppliers');
  }

  getAllSuppliers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setSuppliers(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteSuppliers(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}
