import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public searchValue: string = ''

  @Output() searchCharacter = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  search(data: string) {
   this.searchCharacter.emit(data)
  }

  

}
