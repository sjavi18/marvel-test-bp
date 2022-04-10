import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent{

  @Input() characters: ICharacter[] = []
  @Output() edit = new EventEmitter<ICharacter>()
  @Output() delete = new EventEmitter<ICharacter>()

}
