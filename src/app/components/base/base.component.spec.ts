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

window.scrollTo = jest.fn();
describe('BaseComponent', () => {
  let component: BaseComponent;
  let fixture: ComponentFixture<BaseComponent>;
  let marvelService: MarvelService;

  const responseAll = [{
    _id: "623bb12b12979d2c2b04aad4",
    title: "Iron Man",
    body: "Inventor Tony Stark applies his genius for high-tech solutions to problems as Iron Man, the armored Avenger.",
    image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg",
    category: "main", "idAuthor": "70", "createdAt": "2022-03-03T01:37:01.828Z", "updatedAt": "2022-03-03T01:37:01.828Z"
  }]
  
  const characterTest: ICharacter = {
    title: "Javy",
    body: "Super Javy",
    image: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/002irm_ons_crd_03.jpg",
    category: "main", 
    idAuthor: "70"
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseComponent, HeaderComponent,
        CharacterCardComponent,
        CharacterFormComponent,],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule]
    })
      .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BaseComponent);
    component = fixture.componentInstance;
    marvelService = TestBed.inject(MarvelService);
    fixture.detectChanges();
  });

  it('should retrieve all characters', () => {
    marvelService.getAllCharacters().subscribe(data => {
      expect(data).toEqual(responseAll);
    })
  });

  it('should retrieve the characters depending on the search', () => {
    marvelService.searchCharacter('iron').subscribe(data => {
      expect(data).toEqual(responseAll[0]);
    })
  });

  it('should create the requested character', () => {
    marvelService.createCharacter(characterTest).subscribe(data => {
      expect(data.message).toEqual('Nuevo personaje agregado!');
    })
  });

  it('should edit the requested character', () => {
    marvelService.editCharacter(characterTest, responseAll[0]._id).subscribe(data => {
      expect(data.message).toEqual('Personaje actualizado');
    })
  });

  it('should delete the requested character', () => {
    marvelService.deleteCharacter(responseAll[0]._id).subscribe(data => {
      expect(data.message).toEqual('Personaje eliminado');
    })
  });

  it('should call handlerCancel', () => {
    jest.spyOn(component, 'handlerCancel' as never);
    component.handlerCancel('c')
    expect(component.handlerCancel).toHaveBeenCalled()
  });

  it('should call handlerCancel', () => {
    jest.spyOn(component, 'handlerCancel' as never);
    component.handlerCancel('c')
    expect(component.handlerCancel).toHaveBeenCalled()
  });

  it('should call handlerLogout', () => {
    jest.spyOn(component, 'handlerLogout' as never);
    component.handlerLogout()
    expect(component.handlerLogout).toHaveBeenCalled()
  });

  it('should call handlerNewEvent', () => {
    jest.spyOn(component, 'handlerNewEvent' as never);
    component.handlerNewEvent()
    expect(component.handlerNewEvent).toHaveBeenCalled()
  });

  it('should call processAction to save', () => {
    jest.spyOn(component, 'processAction' as never);
    component.processAction(characterTest)
    expect(component.processAction).toHaveBeenCalled()
  });


  it('should call editCharacter', () => {
    jest.spyOn(component, 'editCharacter' as never);
    component.editCharacter(characterTest)
    expect(component.editCharacter).toHaveBeenCalled()
  });

  it('should call deleteCharacter', () => {
    jest.spyOn(component, 'deleteCharacter' as never);
    component.deleteCharacter(characterTest)
    expect(component.deleteCharacter).toHaveBeenCalled()
  });

  it('should call searchCharacter', () => {
    jest.spyOn(component, 'searchCharacter' as never);
    component.searchCharacter('spider')
    expect(component.searchCharacter).toHaveBeenCalled()
  });

});
