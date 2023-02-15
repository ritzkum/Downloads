import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Iloginuser, Iregistration } from './interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiUrl = "http://localhost:3000/"

  
  // getlogin(){
  //   return this.http.get<Iloginuser[]>(`${this.apiUrl}login`).pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }

  postlogin(data: Iloginuser): Observable<Iloginuser> {
    return this.http.post<Iloginuser>(`${this.apiUrl}login`,data);
  }


  // login(data):Observable<any>{

  // }

  // postlogin(data:Iloginuser):Observable<Iloginuser> {
  //   return this.http.post<Iloginuser>(`${this.apiUrl}login`, data)
  // }
  
  getregister(){
    return this.http.get<Iregistration[]>(`${this.apiUrl}register`).pipe(map((res:any)=>{
      return res;
    }))
  }
  

  postregister(data: Iregistration): Observable<Iregistration> {
    return this.http.post<Iregistration>(`${this.apiUrl}register`,data);
  }



}
