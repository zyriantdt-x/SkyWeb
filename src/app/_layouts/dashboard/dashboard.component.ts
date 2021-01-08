import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StatsService } from 'src/app/services/stats/stats.service';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  TotalOnline: number;
  CurrentUser: any;
  constructor(private tokenStorage: TokenStorageService, private _router: Router, private statsService: StatsService) {
    tokenStorage.getUserObservable()
    .subscribe(result => {
      this.CurrentUser = result;
    })

    this.statsService.getOnline()
    .subscribe(data => {
      this.TotalOnline = data.online
    })
  }

  ngOnInit(): void {
  }

  signOut(): void {
    localStorage.clear();
    this._router.navigate([ "/login" ]);
  }

}
