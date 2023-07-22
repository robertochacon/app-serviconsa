import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceQuoteService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('invoice_quote');
  }

  getAllInvoiceQuote(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setInvoiceQuote(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  updateInvoiceQuote(id: number, json: any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.put(url, json);
  }

  deleteInvoiceQuote(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}