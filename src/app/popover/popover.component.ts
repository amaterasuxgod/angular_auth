import { Component, OnInit} from '@angular/core';
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import { SharingService } from '../sharing.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit {

  xmark = faXmark;

  constructor(
    private _SharingService: SharingService,
  ) { }

  ngOnInit(): void {
  }


}
