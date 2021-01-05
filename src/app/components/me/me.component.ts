import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/services/user/user.response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css', '../../_layouts/dashboard/dashboard.component.css'],
})
export class MeComponent implements OnInit, OnDestroy {
  CurrentUser!: UserResponse

  constructor(private _userService: UserService, private router: Router) {
    this._userService.currentUser?.subscribe(user => {
      this.CurrentUser = user;
    });
  }

  ngOnInit(): void {  }
  ngOnDestroy(): void { }

}
