import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MarvelService } from '../../services/marvel/marvel.service';
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

  /**
   * get all marvel characters according to author
   */
  getAllCharacters() {
    this._marvelService.getAllCharacters().subscribe((data) => {
      this.charactersMarvel = data;
    })
  }

  /**
   * get all the characters that match the search key
   * @param key 
   */
  searchCharacter(key: string) {
    this._marvelService.searchCharacter(key).subscribe((data) => {
      this.charactersMarvel = data;
    })
  }

  /**
   * remove the character matching the sending ID
   * @param character 
   */
  deleteCharacter(character: ICharacter) {
    this._marvelService.deleteCharacter(character._id).subscribe((response) => {
      this.getAllCharacters();
      alert(response.message);
    })
  }

  /**
   * update character matching id by sending
   * @param character 
   */
  editCharacter(character: ICharacter) {
    this.showFormCharacter = true;
    this.hasEditCharacter = true;
    this.characterToEdit = character;
  }

  /**
   * No form visibility
   * @param actionType 
   */
  handlerCancel(actionType: string) {
    this.showFormCharacter = false;
    this.hasEditCharacter = false;
  }

  /**
   * It depends on whether they are editing or creating a new character, the editing or creation of the character is done
   * @param character 
   * @returns 
   */
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

  /**
   * Delete the cookies created for the home path guard
   */
  handlerLogout() {
    this._cookieService.deleteAll()
    this._router.navigate(['/login'])
  }

  /**
   * show the character form in creation mode / no edition
   */
  handlerNewEvent() {
    this.hasEditCharacter = false;
    this.showFormCharacter = true;
  }
}
