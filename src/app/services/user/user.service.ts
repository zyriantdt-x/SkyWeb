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
  //public CurrentUserObservable: Observable<UserResponse>;

  private currentUserSubject: BehaviorSubject<UserResponse> | undefined;
  public currentUser: Observable<UserResponse> | undefined;

  constructor(private _httpClient: HttpClient) {
    if(localStorage.getItem('user') != null) {
      this.currentUserSubject = new BehaviorSubject<UserResponse>(JSON.parse(localStorage.getItem('user') || "{}"));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): UserResponse | undefined {
    if(typeof this.currentUserSubject == "undefined") return undefined;
    return this.currentUserSubject.value;
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
