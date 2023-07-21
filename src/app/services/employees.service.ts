import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url: string = '';
  url_expense: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('employees');
    this.url_expense =  helper.getUrl('employee_expense');
  }

  getAllEmployees(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setEmployees(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteEmployees(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

  //-----------------expense--------------------
  setEmployeesExpense(json: any): Observable<any>{
    const url = this.url_expense;
    return this.http.post(url, json);
  }

}