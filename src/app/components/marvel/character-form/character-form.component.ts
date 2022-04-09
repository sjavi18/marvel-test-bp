import { Component, Input, OnInit } from '@angular/core';
import { ICharacter } from '../../../models/character.model';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  @Input() characters: ICharacter[] = []
  constructor() { }

  ngOnInit(): void {
    
  }

}
