import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() characters: ICharacter[] = []
  @Output() edit = new EventEmitter<ICharacter>()
  @Output() delete = new EventEmitter<ICharacter>()
  constructor() { }

  ngOnInit(): void {

  }

  editCharacter(character: ICharacter) {
    this.edit.emit(character)
  }

  deleteCharacter(character: ICharacter) {
    this.delete.emit(character)
  }
}
