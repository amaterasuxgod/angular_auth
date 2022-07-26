import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {faXmark, faExclamationCircle, faExclamation} from '@fortawesome/free-solid-svg-icons'
import { SharingService } from '../sharing.service';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css']
})
export class PopoverComponent implements OnInit, OnChanges {

  xmark = faXmark;
  xcircle = faExclamationCircle;
  exclamation = faExclamation;
  isLogin: boolean = false;

  @Input()
  type!: string;
  text!: string;
  width!: number;
  timeout!:number;

  @Output()
    showChange = new EventEmitter<string>();
  


  constructor(
    private _SharingService: SharingService,
  ) { }

  ngOnInit(): void {
    // if (this.type='login'){
    //   this.isLogin = true;
    // }
    // console.log(this.type)
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  changes(){
    this.showChange.emit(this.type)
  }

}