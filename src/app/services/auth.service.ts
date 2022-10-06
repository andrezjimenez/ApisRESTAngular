import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { Auth } from './../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(
    private http: HttpClient
  ) { }

    login(email: string, password : string){
      return this.http.post<Auth>(`${this.apiURL}/login`,{email, password});
    }
    // --token: string
    profile(){
      return this.http.get(`${this.apiURL}/profile`);
    }
}
 