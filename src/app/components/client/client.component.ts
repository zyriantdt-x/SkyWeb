import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, AfterViewInit {

	@ViewChild("client")
	private elRef!: ElementRef;

	constructor(private renderer: Renderer2, private userService: UserService, private router: Router) {

	}

	ngOnInit(): void {
		this.userService.get_current_user()
		.then(result => {
			return;
		})
		.catch(err => {
			return this.router.navigate([ '/login' ]);
		})
	}

	ngAfterViewInit(): void {
		this.userService.do_client_auth()
		.then(auth_token => {
			let swfURL = "http://161.97.92.57/assets/swf/gordon/PRODUCTION-201701242205-837386173/Habbo.swf";
			let swfBase = "http://161.97.92.57/assets/swf/gordon/PRODUCTION-201701242205-837386173/";
			let flashVarsString = "";
			let flashVars = {
				"client.allow.cross.domain": "0",
				"client.notify.cross.domain": "1",
				"connection.info.host": "161.97.92.57",
				"connection.info.port": "30000",
				"site.url": "http://161.97.92.57",
				"url.prefix": "http://161.97.92.57",
				"client.reload.url": "http://161.97.92.57/",
				"client.fatal.error.url": "http://161.97.92.57",
				"client.connection.failed.url": "http://161.97.92.57",
				"external.override.texts.txt": "http://161.97.92.57/assets/swf/gamedata/override/external_flash_override_texts.txt",
				"external.override.variables.txt": "http://161.97.92.57/assets/swf/gamedata/override/external_override_variables.txt", 	
				"external.variables.txt": "http://161.97.92.57/assets/swf/gamedata/external_variables.txt",
				"external.texts.txt": "http://161.97.92.57/assets/swf/gamedata/external_flash_texts.txt",
				"external.figurepartlist.txt": "http://161.97.92.57/assets/swf/gamedata/figuredata.xml", //PRODUCTION-201701242205-837386173
				"flash.dynamic.avatar.download.configuration": "http://161.97.92.57/assets/swf/gordon/PRODUCTION-201701242205-837386173/figuremap.xml",
				"productdata.load.url": "http://161.97.92.57/assets/swf/gamedata/productdata.txt", 
				"furnidata.load.url": "http://161.97.92.57/assets/swf/gamedata/furnidata.xml",
				"use.sso.ticket": "1",
				"sso.ticket": auth_token || "",
				"processlog.enabled": "0",
				"client.starting": "uwu is loading...",
				"flash.client.url": "http://161.97.92.57/assets/swf/gordon/PRODUCTION-201701242205-837386173/",
				"flash.client.origin": "popup",
				"ads.domain": "",
				"diamonds.enabled": '1',
			  }
			for(let [key,value] of Object.entries(flashVars)) {
				flashVarsString += key + '=' + value + '&amp;';
			}
			this.renderer.setProperty(this.elRef.nativeElement, 'innerHTML', `
			<object id="flash-container" type="application/x-shockwave-flash" data="${swfURL}" width="100%" height="100%"><param name="base" value="${swfBase}"><param name="allowScriptAccess" value="always"><param name="menu" value="false"><param name="wmode" value="opaque"><param name="flashvars" value="${flashVarsString}"></object>
			`);
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
		});

	}

}
