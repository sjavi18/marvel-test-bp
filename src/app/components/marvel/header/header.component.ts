import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchValue: string = ''

  @Output() searchCharacter = new EventEmitter<string>()
  @Output() logoutEvent= new EventEmitter<boolean>()
  @Output() newEvent = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  search(data: string) {
   this.searchCharacter.emit(data)
  }

  logout() {
    this.logoutEvent.emit(true)
  }

  new() {
    this.newEvent.emit(true)
  }
}
