import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';

describe('BaseComponent', () => {
  let component: BaseComponent;
  beforeEach(async () => {
    component = new BaseComponent();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
