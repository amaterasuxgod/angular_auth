import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SharingService } from '../sharing.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  response:any;
  
  constructor(
    private _SharingService: SharingService
  ) { }

  ngOnInit(): void {
    this.response = this._SharingService.data
  }

}
