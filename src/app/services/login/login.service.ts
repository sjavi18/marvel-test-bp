import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../../models/user.model';
import { environment } from '../../../environments/environment.prod';

const url: string = environment.url;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly _http: HttpClient) {}

  login(user: IUser): Observable<any> {
    return this._http.post<IUser>(`${url}/login`, user);
  }

  signup(user: IUser): Observable<any> {
    user.authorid = user.authorid.toString()
    return this._http.post<any>(`${url}/signup`, user);
  }

}
