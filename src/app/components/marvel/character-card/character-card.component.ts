import { Component, Input, OnInit } from '@angular/core';
import { ICharacter } from 'src/app/models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {

  @Input() characters: ICharacter[] = []
  constructor() { }

  ngOnInit(): void {
    
  }
}
