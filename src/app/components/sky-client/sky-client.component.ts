import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sky-client',
  templateUrl: './sky-client.component.html',
  styleUrls: ['./sky-client.component.css']
})
export class SkyClientComponent implements OnInit, AfterViewInit {

  @ViewChild("client")
	private elRef!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private activatedRoute: ActivatedRoute,
    private tokenStorage: TokenStorageService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      let auth_token = params.get('token');

      let swfURL = environment.HABBO_SWF;
			let swfBase = environment.PRODUCTION_BASE;
			
			let flashVars = {
				"client.allow.cross.domain": "0",
				"client.notify.cross.domain": "1",
				"connection.info.host": environment.CLIENT_HOST,
				"connection.info.port": environment.CLIENT_PORT,
				"site.url": environment.URL,
				"url.prefix": environment.URL,
				"client.reload.url": environment.URL + "/disconnected",
				"client.fatal.error.url": environment.URL + "/disconnected",
				"client.connection.failed.url": environment.URL + "/disconnected",
				"external.override.texts.txt": environment.EXTERNAL_OVERRIDE_TEXTS,
				"external.override.variables.txt": environment.EXTERNAL_OVERRIDE_VARIABLES, 	
				"external.variables.txt": environment.EXTERNAL_VARIABLES,
				"external.texts.txt": environment.EXTERNAL_TEXTS,
				"external.figurepartlist.txt": environment.FIGURE_DATA,
				"flash.dynamic.avatar.download.configuration": environment.FIGURE_MAP,
				"productdata.load.url": environment.PRODUCT_DATA, 
				"furnidata.load.url": environment.FURNI_DATA,
				"use.sso.ticket": "1",
				"sso.ticket": auth_token,
				"processlog.enabled": "0",
				"client.starting": "Sky is loading...",
				"flash.client.url": environment.PRODUCTION_BASE,
				"flash.client.origin": "popup",
				"ads.domain": "",
				"diamonds.enabled": '1',
			}

			let flashVarsString = "";
			for(let [key,value] of Object.entries(flashVars)) {
				flashVarsString += key + '=' + value + '&amp;';
			}

			this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', `<object id="flash-container" type="application/x-shockwave-flash" data="${swfURL}" width="100%" height="100%"><param name="base" value="${swfBase}"><param name="allowScriptAccess" value="always"><param name="menu" value="false"><param name="wmode" value="opaque"><param name="flashvars" value="${flashVarsString}"></object>`);
			
			(window as any).HabboFlashClient = {
				started: !1,
				init: () =>
				{
					setTimeout(() =>
					{
						(window as any).HabboFlashClient.flashInterface = document.getElementById('flash-container');
					}, 1000);
				}
			};

			window.addEventListener("load", (window as any).HabboFlashClient.init());

			(window as any).FlashExternalInterface.track = (action: string, label: string, value: string) =>
			{
				console.log('action = [' + action + '], label = [' + label + '], value = [' + value + ']');
			};

    })
  }

}
