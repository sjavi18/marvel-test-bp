import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MarvelService } from 'src/app/services/marvel.service';
import { ICharacter } from '../../models/character.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public charactersMarvel: ICharacter[] = []
  public showFormCharacter: boolean = false
  public characterToEdit!: ICharacter 
  public show: boolean = false

  constructor(private readonly _marvelService: MarvelService) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this._marvelService.getAllCharacters().subscribe((data) => {
      this.charactersMarvel = data
    })
  }

  searchCharacter(key: string) {
    this._marvelService.searchCharacter(key).subscribe((data) => {
      this.charactersMarvel = data
    })
  }

  deleteCharacter(character: ICharacter) {
    console.log('del___', character)
  }

  editCharacter(character: ICharacter) {
    console.log('edi___', character)
    this.show = true
    this.showFormCharacter = true
    this.characterToEdit = character
  }
}
