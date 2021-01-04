import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

import { LoginService } from "../../services/login/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../_layouts/site/site.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(private _formBuilder: FormBuilder, private _loginService: LoginService, private _router: Router, private _userService: UserService) { 
    this.loginFailed = false;
    this.loginForm = this._formBuilder.group({
      sky_username: ['', Validators.required],
      sky_password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._userService.get_current_user()
    .then(result => {
      if(!result.error) return this._router.navigate([ '/me' ]);
      return;
    })
    .catch(result => {})
  }

  doStuff() {
    this._loginService.doLogin(this.loginForm.value)
    .then(result => {
      console.log("test");
      if(result != null) return this._router.navigate([ "/me" ]);
      console.log("test");
      return;
    })
    .catch(reject => {
      this.loginFailed = true;
    })
  }

}
