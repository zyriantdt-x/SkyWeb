import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { LoginResponse } from "./login.response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpClient: HttpClient) {

  }

  doLogin(form_data : object) {
    return new Promise((resolve, reject) => {
      this._httpClient.post<LoginResponse>(environment.API_URL + "/authentication/authenticate/login", form_data).toPromise()
      .then(result => {
        localStorage.setItem("auth_key", result.token);
        resolve("hello uwu");
      })
      .catch(error => {
        return reject(error);
      })
    })
  }
}
