import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css', '../../_layouts/dashboard/dashboard.component.css'],
})
export class MeComponent implements OnInit, OnDestroy {
  CurrentUser: any

  constructor(private tokenStorage: TokenStorageService, private router: Router) {
    tokenStorage.getUserObservable().subscribe(result => {
      this.CurrentUser = result;
    })
  }

  ngOnInit(): void {  }
  ngOnDestroy(): void { }

}
