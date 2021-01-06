import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../_layouts/site/site.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private authService: AuthService, private tokenStorage: TokenStorageService) { 
    this.loginFailed = false;
    this.loginForm = this._formBuilder.group({
      sky_username: ['', Validators.required],
      sky_password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this._router.navigate(['/me']);
    }
  }

  doStuff() {
    const username = this.loginForm.value.sky_username;
    const password = this.loginForm.value.sky_password;

    this.authService.login(username, password)
    .subscribe(data => {
      this.tokenStorage.saveToken(data.token);
      this.tokenStorage.saveUser(data.user);

      window.location.reload();
    }, err => {
      this.loginFailed = true;
    })
  }

}
