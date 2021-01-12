import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-sky-client-token',
  templateUrl: './sky-client-token.component.html',
  styleUrls: ['./sky-client-token.component.css']
})
export class SkyClientTokenComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.tokenStorage.getSSO().subscribe((result: any) => {
      window.location.href = "skyhotel://" + result;
    })
  }

}
