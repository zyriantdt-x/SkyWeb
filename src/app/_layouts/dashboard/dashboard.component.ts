import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserResponse } from 'src/app/services/user/user.response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  CurrentUser!: UserResponse;
  currentUserSubscription: Subscription | undefined;

  TotalOnline: number | undefined;

  constructor(private userService: UserService, private _router: Router) {
    this.currentUserSubscription = this.userService.currentUser?.subscribe(user => {
      this.CurrentUser = user;
    });

    this.userService.get_total_online()
    .then(result => {
      this.TotalOnline = result;
    })
  }

  ngOnInit(): void {
  }

  signOut(): void {
    localStorage.clear();
    this._router.navigate([ "/login" ]);
  }

}
