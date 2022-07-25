import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import {faEye, faEyeSlash, faGrinTongueSquint} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  response: any;
  data: any;
  eye = faEye;
  slashEye = faEyeSlash
  visible:boolean = true;
  changetype: boolean = true;
  userProfile = {}

  constructor(
    private http: HttpClient,
    private router: Router,
    private _SharingService: SharingService
    ) { }


  submit(data: {login: string, password: string}) {
    console.log(data)
    this.http.post('http://51.15.220.219:81/api/login', data)
    .subscribe((res) => {
      this.response = res;
      this.response = JSON.stringify(this.response)
      this._SharingService.getJson(res=this.response)
      this.router.navigate(['/dashboard']);
    })
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype
  }
}
