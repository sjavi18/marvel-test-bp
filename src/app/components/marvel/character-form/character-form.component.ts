import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICharacter } from '../../../models/character.model';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss']
})
export class CharacterFormComponent implements OnInit {

  @Input() characterToEdit!: ICharacter
  @Input() hasEditCharacter: boolean = false
  @Output() handleCancel = new EventEmitter<string>()
  @Output() dataToSave = new EventEmitter<ICharacter>()
  
  public title = 'Nuevo personaje'

  characterForm!: FormGroup;

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formCharacter();
  }

  /**
   * Create the form and if it is a character edition, assign its data
   */
  formCharacter(): void {
    this.characterForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.hasEditCharacter && this.setData()
  }

  /**
   * assignment of character data in case of editing
   */
  setData() {
    this.title = 'Editar Personaje';
    this.characterForm.controls['title'].setValue(this.characterToEdit.title);
    this.characterForm.controls['body'].setValue(this.characterToEdit.body);
    this.characterForm.controls['image'].setValue(this.characterToEdit.image);
    window.scrollTo(0, 0);
  }

  /**
   * reset the form and emit the cancel event to hide the form
   */
  cancel() {
    this.characterForm.reset();
    this.handleCancel.emit('c')
  }

}
