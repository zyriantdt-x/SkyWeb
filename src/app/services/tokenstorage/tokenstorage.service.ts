import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private http: HttpClient) {}

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

  public getUserObservable(): Observable<any> {
    return new Observable((that) => {
      const user = localStorage.getItem("user");
      if (user) {
        that.next(JSON.parse(user));
      } else { return that.next(null) }

      this.http.get<any>(environment.API_URL + "/hotel/users/current_user").toPromise()
      .then(result => {
        localStorage.setItem("user", JSON.stringify(result));
        that.next(result);
      })
      .catch(err => {})
    })
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
