import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from '../sharing.service';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
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
  close:boolean;
  border_add:boolean = false;
  
  // Popout
  // Получаем дочерний компонент
  @ViewChild('container', {read: ViewContainerRef, static:true})
  container: ViewContainerRef;
  component: any;
  popout = false;
  // Динамические данные для инпута, свойства компонента зависят от этих данных
  popout_type: string = 'login';
  popout_text: string = 'Неверный логин либо пароль';
  popout_width: string = '320px';
  popout_timeout: number = 15000;


  constructor(
    private http: HttpClient,
    private router: Router,
    private _SharingService: SharingService,

    ) { }


  createComponent(){
    this.popout = true;
    this.container.clear();
    this.component = this.container.createComponent(PopoverComponent);
    // подсветка инпутов
    this.border_add = true;
    // передача данных в инпут
    this.component.instance.type = this.popout_type;
    this.component.instance.text = this.popout_text;
    this.component.instance.width = this.popout_width;
    this.component.instance.timeout = this.popout_timeout;
    // сабскрайбимся на аутпут из дочернего элемента, после получения аутпута убираем компонент
    this.component.instance.output.subscribe((results:boolean)=>{
      this.close = results
      this.hideComponent();
      this.border_add = false;
    })
    // удаление компонента с задержкой
    if(this.popout){
      setTimeout(()=>{
        this.hideComponent()
      },15000)
    }
  }

  hideComponent() {
    this.popout = false;
    this.border_add = false;
    this.container.clear();
  }



  submit(data: {login: string, password: string}) {
    // отправляем запрос к api
    this.http.post('http://51.15.220.219:81/api/login', data)
    .subscribe(
      res => {
        this.response = res;
        // из ответа берем токен и рефреш токен
        this.token = this.response.tokens.token
        this.refreshToken = this.response.tokens.refreshToken
        // ответ приводим к строке
        this.response = JSON.stringify(this.response)
        // передаем ответ в сервис, а из него в дашборд
        this._SharingService.getJson(res=this.response)
        // сохраняем токен и рефреш токен в хранилище
        localStorage.setItem('token', JSON.stringify(this.token))
        localStorage.setItem('refreshToken', JSON.stringify(this.refreshToken))
        // для потенциального функционала запоминания пароля
        if(this.rememberMe){
          localStorage.setItem('rememberMe','yes')
        }
        // редирект в дашборд
        this.router.navigate(['/dashboard']);
      },
      error => this.createComponent()
      
     )
  }

  // триггер для видимого пароля
  viewpass() {
    this.visible = !this.visible;
    this.changetype = !this.changetype
  }
}
