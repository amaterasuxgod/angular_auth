import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  data: any;

  constructor() { }

  getJson(res:any) {
    this.data = res;
  };

}
