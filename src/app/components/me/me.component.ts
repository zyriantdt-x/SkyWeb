import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/services/user/user.response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css', '../../_layouts/dashboard/dashboard.component.css'],
})
export class MeComponent implements OnInit {
  CurrentUser: UserResponse | undefined
  constructor(private _userService: UserService, private router: Router) {
    _userService.CurrentUserObservable
    .subscribe(result => {
      this.CurrentUser = result;
    })
  }

  ngOnInit(): void {
    /*this._userService.get_current_user()
    .then(result => {
      this.CurrentUser = result;
      return;
    })
    .catch(error => {
      return this.router.navigate([ '/login' ]);
    })*/

  }

}
