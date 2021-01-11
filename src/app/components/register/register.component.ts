import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenstorage/tokenstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../_layouts/site/site.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup
  registrationFailed: boolean

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) { 
    this.registrationFailed = false;

    this.registrationForm = this.formBuilder.group({
      reg_username: ['', Validators.required],
      reg_email: ['', [ Validators.required, Validators.email ]],

      passwordGroup: this.formBuilder.group({
        reg_password: ['', Validators.required],
        reg_passwordtwo: ['', [ Validators.required ]]
      }, { validator: this.passwordMatcher })

    })
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.router.navigate(['/me']);
    }
  }

  private passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('reg_password');
    const confirmControl = c.get('reg_passwordtwo');
  
    if (emailControl?.pristine || confirmControl?.pristine) {
      return null;
    }
  
    if (emailControl?.value === confirmControl?.value) {
      return null;
    }
    return { 'match': true };
  }

  submit() {
    console.log(this.registrationForm.value);
  }

}
