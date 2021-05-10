import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../models/clinic';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingularResponseModel } from '../models/SingularResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  apiUrl = environment.apiURL;

  constructor(private httpClient : HttpClient) { }

  
  getClinics(): Observable<ListResponseModel<Clinic>>{
    return this.httpClient.get<ListResponseModel<Clinic>>(this.apiUrl+'clinics/getall');
  }

  getById(id: number): Observable<SingularResponseModel<Clinic>> {
    return this.httpClient.get<SingularResponseModel<Clinic>>(this.apiUrl+'clinics/getbyid?id='+id);
  }

  getByName(name: string): Observable<SingularResponseModel<Clinic>> {
    return this.httpClient.get<SingularResponseModel<Clinic>>(this.apiUrl+'clinics/getbyname?name='+name);
  }

  add(clinic:Clinic):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"clinics/add",clinic);
  }

  update(clinic:Clinic):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"clinics/update",clinic);
  }

  delete(clinic:Clinic):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"clinics/delete",clinic);
  }
}
