import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  url: string = '';

  constructor(private http: HttpClient, private helper: HelperService) { 
    this.url =  helper.getUrl('equipment_rental');
  }

  getAllEquipmentRental(): Observable<any>{
    const url = this.url;
    return this.http.get(url);
  }

  setEquipmentRental(json: any): Observable<any>{
    const url = this.url;
    return this.http.post(url, json);
  }

  deleteEquipmentRental(id: number): Observable<any>{
    const url = this.url+'/'+id;
    return this.http.delete(url);
  }

}