import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  data: any;

  constructor() { }

  getJson(res:any) {
    this.data = res;
  }
}
