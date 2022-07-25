import { Injectable } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  data: any;
  del_popout: any;

  constructor() { }

  getJson(res:any) {
    this.data = res;
  };

  removePopout(res1:any) {
    this.del_popout = res1;
  };
}
