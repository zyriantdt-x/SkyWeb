import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/services/user/user.response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  CurrentUser: UserResponse | undefined;
  TotalOnline: number | undefined;

  constructor(private userService: UserService, private _router: Router) {
    
  }

  ngOnInit(): void {
    if(localStorage.getItem("auth_key") == null) {
      this._router.navigate([ "/login" ]);
      return;
    }

    this.userService.get_current_user()
    .then(result => {
      this.CurrentUser = result;
      return
    })
    .catch(result => {
      localStorage.clear();
      return this._router.navigate([ "/login" ]);
    })

    this.userService.get_total_online()
    .then(result => {
      this.TotalOnline = result;
    })
  }

  signOut(): void {
    localStorage.clear();
    this._router.navigate([ "/login" ]);
  }

}
