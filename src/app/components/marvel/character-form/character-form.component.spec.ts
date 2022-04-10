import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CharacterFormComponent } from './character-form.component';
import { ICharacter } from '../../../models/character.model';

describe('CharacterFormComponent', () => {
  let component: CharacterFormComponent;
  let fixture: ComponentFixture<CharacterFormComponent>;

  let character: ICharacter = {
    title: "Javy",
    body: "Super Javy",
    category: "main",
    image: "http://imagen"
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterFormComponent ],
      imports: [ReactiveFormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterFormComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(component).toBeTruthy();
  });

  it('should create with edit character', () => {
    component.hasEditCharacter = true
    component.characterToEdit = character
    component.setData()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should cancel edit character', () => {
    component.cancel()
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
