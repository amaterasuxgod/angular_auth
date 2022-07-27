import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input,  OnInit, } from '@angular/core';
import {faXmark, faExclamationCircle, faExclamation} from '@fortawesome/free-solid-svg-icons'
import { Subject } from 'rxjs';


@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.css'],
  // создание анимации для попаута
  animations: [
    trigger('openDiv',[
      state('start',style({
        transform: 'translateX(350px)',  
      })),
      state('end',style({
        transform: 'translateX(0)',
      })),
      transition('start=>end', animate(500)),
      transition('end=>start', animate(500)),
    ])  
  ]
})
export class PopoverComponent implements OnInit {

  clickedDivState = 'start';
  xmark = faXmark;
  xcircle = faExclamationCircle;
  exclamation = faExclamation;
  isLogin: boolean = false;
  close: boolean = true
  
  private output = new Subject<boolean>();

  @Input()
  type!: string;
  text!: string;
  width!: string;
  timeout!:number;
  


  constructor(
  ) { }

  
  // отправляем аутпут в родительский компонент
  sendData(){
    this.output.next(true);
  }

  ngOnInit(): void {
    // если тип элемент логин, меняем значение переменной. Далее можно добавлять различные типы компонента,
    // на которые можно будет вешать определенную иконку, привязывая ее к переменным.
    if(this.type=='login'){
      this.isLogin = true;
    }

    // таймаут для триггера анимации
    setTimeout(() => this.clickedDivState = 'end', 0);
    setTimeout(() => this.clickedDivState = 'start', 14500);
  }

}