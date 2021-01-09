import { Component, OnInit } from '@angular/core';
import { StatsService } from 'src/app/services/stats/stats.service';

@Component({
  selector: 'app-online',
  templateUrl: './online.component.html',
  styleUrls: ['./online.component.css', '../../_layouts/dashboard/dashboard.component.css']
})
export class OnlineComponent implements OnInit {

  OnlineUsers: any
  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.statsService.getOnlinePage()
    .subscribe(result => {
      this.OnlineUsers = result;
    })
  }

}
