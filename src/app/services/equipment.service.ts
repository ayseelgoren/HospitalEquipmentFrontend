import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/SingularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  
  apiUrl = environment.apiURL;

  constructor(private httpClient : HttpClient) { }

  
  getEquipments(): Observable<ListResponseModel<Equipment>>{
    return this.httpClient.get<ListResponseModel<Equipment>>(this.apiUrl+'equipments/getall');
  }

  getById(id: number): Observable<SingularResponseModel<Equipment>> {
    return this.httpClient.get<SingularResponseModel<Equipment>>(this.apiUrl+'equipments/getbyid?id='+id);
  }

  getByName(name: string): Observable<SingularResponseModel<Equipment>> {
    return this.httpClient.get<SingularResponseModel<Equipment>>(this.apiUrl+'equipments/getbyname?name='+name);
  }

  add(equipment:Equipment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"equipments/add",equipment);
  }

  update(equipment:Equipment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"equipments/update",equipment);
  }

  delete(equipment:Equipment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"equipments/delete",equipment);
  }
}
