import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpErrorResponse,HttpStatusCode } from '@angular/common/http';
import { retry, catchError,map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User, CreateUserDTO} from './../models/user.model';
import { environment } from 'src/environments/environment';
import { useAnimation } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/users';

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiURL, dto);
  }

  getAllUser(){
    return this.http.get<User[]>(this.apiURL);
  }



}
 