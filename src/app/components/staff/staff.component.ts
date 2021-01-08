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
    this.statsService.getStaffPage()
    .subscribe(data => {
      this.StaffData = data;
    })
  }

}
