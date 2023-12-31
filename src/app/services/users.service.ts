import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url: string = '';
  url_register: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('users');
    this.url_register =  helper.getUrl('register');
  }

  getAllUsers(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setUsers(json: any): Observable<any>{
    const url = this.url_register;
    return this.http.post(url, json);
  }

  updateUsers(id: number, json: any): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.post(url, json);
  }

  updateUsersPassword(id: any, json: any): Observable<any>{
    const url = this.url+'/reset_password/'+id;
    return this.http.post(url, json);
  }

  deleteUsers(id: number): Observable<any>{
    const url = this.url+'/delete/'+id;
    return this.http.post(url, id);
  }

  getPatient(identification: any,): Observable<any>{
    const url = 'https://api.cedulado.microslab.com.do/api/cedulado/'+identification;
    return this.http.get(url);
  }

}
