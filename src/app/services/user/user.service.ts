import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserResponse } from './user.response';
import { StaffResponse } from "./staff.response";
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public CurrentUserObservable: Observable<UserResponse>;
  public CurrentUser: UserResponse | undefined;
  constructor(private _httpClient: HttpClient) {
    this.CurrentUserObservable = this.current_user_as_observable();
  }

  get_current_user() {
    return new Promise<UserResponse>((resolve, reject) => {
      if(localStorage.getItem("auth_key") == null) {
        reject(null);
      }
      let hdr = new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("auth_key") || ""
      })
      this._httpClient.get<UserResponse>(environment.API_URL + "/hotel/users/current_user", {
        headers: hdr
      }).toPromise()
      .then(result => {
        resolve(result);
      })
      .catch(result => {
        reject(result);
      })
    })
  }

  current_user_as_observable() {
    return this._httpClient.get<UserResponse>(environment.API_URL + "/hotel/users/current_user", {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("auth_key") || ""
      })
    })
  }

  get_total_online() {
    return new Promise<number>((resolve, reject) => {
      this._httpClient.get<number>(environment.API_URL + "/hotel/stats/total_online").toPromise()
      .then(result => {
        resolve(result);
      })
    });
  }

  do_client_auth() {
    return new Promise<string>((resolve, reject) => {
      let hdr = new HttpHeaders({
        "Authorization": "Bearer " + localStorage.getItem("auth_key") || ""
      })
      this._httpClient.get<string>(environment.API_URL + "/authentication/authenticate/generate_auth_token", {
        headers: hdr
      }).toPromise()
      .then(result => {
        resolve(result);
      })
      .catch(result => {
        reject(null);
      })
    })
  }

  get_staff_info() {
    return new Promise<StaffResponse>((resolve, reject) => {
      this._httpClient.get<StaffResponse>(environment.API_URL + "/hotel/users/staff_page_info").toPromise()
      .then(result => {
        resolve(result);
      })
      .catch(result => {
        reject(null);
      })
    }); 
  }
}
