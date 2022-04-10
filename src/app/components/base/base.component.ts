import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MarvelService } from 'src/app/services/marvel/marvel.service';
import { ICharacter } from '../../models/character.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public charactersMarvel: ICharacter[] = [];
  public showFormCharacter: boolean = false;
  public characterToEdit!: ICharacter;
  public hasEditCharacter: boolean = false;

  constructor(private readonly _marvelService: MarvelService,
              private readonly _router: Router,
              private readonly _cookieService: CookieService) { }

  ngOnInit(): void {
    this.getAllCharacters()
  }

  getAllCharacters() {
    this._marvelService.getAllCharacters().subscribe((data) => {
      this.charactersMarvel = data;
    })
  }

  searchCharacter(key: string) {
    this._marvelService.searchCharacter(key).subscribe((data) => {
      this.charactersMarvel = data;
    })
  }

  deleteCharacter(character: ICharacter) {
    this._marvelService.deleteCharacter(character._id).subscribe((response) => {
      this.getAllCharacters();
      alert(response.message);
    })
  }

  editCharacter(character: ICharacter) {
    this.showFormCharacter = true;
    this.hasEditCharacter = true;
    this.characterToEdit = character;
  }

  handlerCancel(actionType: string) {
    this.showFormCharacter = false;
    this.hasEditCharacter = false;
  }

  processAction(character: ICharacter) {
    if (this.hasEditCharacter) {
      this._marvelService.editCharacter(character, this.characterToEdit._id).subscribe(response => {
        this.getAllCharacters();
        this.showFormCharacter = false;
        this.hasEditCharacter = false;
        alert(response.message);
      })
      return
    }
    character.category = 'main'
    this._marvelService.createCharacter(character).subscribe(response => {
      this.getAllCharacters();
      this.showFormCharacter = false;
      this.hasEditCharacter = false;
      alert(response.message);
    })

  }

  handlerLogout() {
    this._cookieService.deleteAll()
    this._router.navigate(['/login'])
  }

  handlerNewEvent() {
    this.hasEditCharacter = false;
    this.showFormCharacter = true;
  }
}
