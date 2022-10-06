import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse,HttpStatusCode,HttpHeaders } from '@angular/common/http';
import { Auth } from './../models/auth.model';
import { User } from './../models/user.model';


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
    profile(token : string){
    //   const headers = new HttpHeaders();
    //   headers.set('authorization',`Bearer ${token}`)
      return this.http.get<User>(`${this.apiURL}/profile`,{
        headers: {
          Authorization: `Bearer ${token}`,
          // 'Content-type': 'application/json'
        }
      });
    }

    getProfile(token: string) {
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      headers = headers.set('Content-type', 'application/json');
      return this.http.get<User>(`${this.apiURL}/profile`, { headers });
    }

}
 