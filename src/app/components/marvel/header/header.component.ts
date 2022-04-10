import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() searchCharacter = new EventEmitter<string>()
  @Output() logoutEvent= new EventEmitter<boolean>()
  @Output() newEvent = new EventEmitter<boolean>()

}
