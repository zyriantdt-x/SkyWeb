import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    document.querySelector('body')?.classList.add('bgl');
  }

  ngOnDestroy() {
    document.querySelector('body')?.classList.remove('bgl');
  }

}
