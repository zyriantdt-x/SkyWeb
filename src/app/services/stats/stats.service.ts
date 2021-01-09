import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient) { }

  getOnline() {
    return this.http.get<any>(environment.API_URL + "/hotel/stats/total_online")
  }

  getStaffPage() {
    return this.http.get<any>(environment.API_URL + "/hotel/users/staff_page_info")
  }

  getOnlinePage() {
    return this.http.get<any>(environment.API_URL + "/hotel/stats/online_users");
  }
}
