import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MarvelService } from '../../services/marvel/marvel.service';
import { CharacterCardComponent } from '../marvel/character-card/character-card.component';
import { CharacterFormComponent } from '../marvel/character-form/character-form.component';
import { HeaderComponent } from '../marvel/header/header.component';

import { BaseComponent } from './base.component';
import { ICharacter } from '../../models/character.model';
import { of, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

window.scrollTo = jest.fn();
describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let marvelService: MarvelService
  let marvelServiceMock: any
  let fixtureTwo

  const responseAll: Observable<ICharacter[]> = of([{
    _id: "623bb12b12979d2c2b04aad4",
    title: "Iron Man",
    body: "Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.",
    image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg",
    category: "main", "idAuthor": "70", "createdAt": "2022-03-03T01:37:01.828Z", "updatedAt": "2022-03-03T01:37:01.828Z"
  }])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent, HeaderComponent,
        CharacterCardComponent,
        CharacterFormComponent,],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      providers: [MarvelService, CookieService]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);

    fixture.detectChanges();
  });

  it('should create', () => {

    marvelService.getAllCharacters().subscribe(data => {
      expect(data).toBe(0);
    })

  });

});
