import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  constructor(private http: HttpClient) { }

  get_locale(value: string) {
    return this.http.post<any>(environment.API_URL + "/hotel/locale/get_locale", {
      key: value
    })
  }
}
