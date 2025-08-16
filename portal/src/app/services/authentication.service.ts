import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropertiesService } from './properties.service';
import { LoginResponse } from '../model/base';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

constructor(private http: HttpClient, private properties:  PropertiesService) { }

    attemptLogin(username: string, password: string)  {
        const url = this.properties.getUrl() + 'auth/log-in';
        const body = { username, password };
        return this.http.post<LoginResponse>(url, body);
    }

    isAuthenticated(): any {
        const url = this.properties.getUrl() + 'auth/is-authenticated';
        return this.http.get(url, {withCredentials: true});
    }
    

}