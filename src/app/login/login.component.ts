import { HttpClient } from '@angular/common/http';
import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import {faEye, faEyeSlash, faGrinTongueSquint} from '@fortawesome/free-solid-svg-icons'
import { PopoverComponent } from '../popover/popover.component';


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
  rememberMe = false;
  token:any;
  refreshToken:any;
  @ViewChild('container', {read: ViewContainerRef, static:true})
  container!: ViewContainerRef;
  popout = false;
  errorMessage = null

  constructor(
    private http: HttpClient,
    private router: Router,
    private _SharingService: SharingService,

    ) { }


  createComponent(){
    this.container.clear();
    this.container.createComponent(PopoverComponent)
  }


  submit(data: {login: string, password: string}) {
    console.log(data)
    this.http.post('http://51.15.220.219:81/api/login', data)
    .subscribe((res) => {
        this.response = res;
        this.token = this.response.tokens.token
        this.refreshToken = this.response.tokens.refreshToken
        this.response = JSON.stringify(this.response)
        this._SharingService.getJson(res=this.response)
        localStorage.setItem('token', JSON.stringify(this.token))
        localStorage.setItem('refreshToken', JSON.stringify(this.refreshToken))
        if(this.rememberMe){
          localStorage.setItem('rememberMe','yes')
        }
        console.log(localStorage.getItem('rememberMe'))
        this.router.navigate(['/dashboard']);
      }
      
     )
  }

  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype
  }
}
