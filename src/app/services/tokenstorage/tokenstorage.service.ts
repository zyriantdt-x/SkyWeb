import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private userInfo: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.userInfo = new BehaviorSubject<any>(null);
  }

  logOut(): void {
    localStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
  }

  public getToken(): string | null {
    return localStorage.getItem("token");
  }

  public saveUser(user: any): void {
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser(): any {
    this.updatedUser();
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public getSSO(): any {
    return this.http.get<any>(environment.API_URL + "/authentication/authenticate/generate_auth_token");
  }

  private updatedUser() {
    this.http.get<any>(environment.API_URL + "/hotel/users/current_user").toPromise()
    .then(result => {
      localStorage.setItem("user", JSON.stringify(result));
    })
    .catch(err => {})
  }
}
