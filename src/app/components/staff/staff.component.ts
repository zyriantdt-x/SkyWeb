import { Component, OnInit } from '@angular/core';
import { StaffResponse } from 'src/app/services/user/staff.response';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css', '../../_layouts/dashboard/dashboard.component.css']
})
export class StaffComponent implements OnInit {

  StaffData: StaffResponse | undefined;
  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.get_staff_info()
    .then(result => {
      this.StaffData = result;
      console.log(result)
    })
  }

}
