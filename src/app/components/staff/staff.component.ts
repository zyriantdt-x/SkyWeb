import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css', '../../_layouts/dashboard/dashboard.component.css']
})
export class StaffComponent implements OnInit {

  StaffData: any;
  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    /*this._userService.get_staff_info()
    .then(result => {
      this.StaffData = result;
      console.log(result)
    })*/
    this.statsService.getStaffPage()
    .subscribe(data => {
      this.StaffData = data;
    })
  }

}
