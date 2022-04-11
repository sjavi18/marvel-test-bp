import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginService } from '../../services/login/login.service';

import { LoginComponent } from './login.component';
import { IUser } from '../../models/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  const userTest: IUser = {
    "email": "user4@gmail.com", 
    "password": "password",
    "authorid": "1"
  }

  const loginResp = {
    "success": true,
    "data": {
      "id": 8,
      "email": "user2@gmail.com",
      "authorid": 1,
      "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ1c2VyMkBnbWFpbC5jb20iLCJhdXRob3JpZCI6MSwiaWF0IjoxNjQ5NjQ0ODcxLCJleHAiOjE2NDk2NDg0NzF9.IixvScbCFzSXhpMEcLhKBMt2JsdYS3_Hf5zUOmVx--0"
    }
  }

  const signupResp = {
    "success": true,
    "message": "Usuario registrado exitosamente."
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    
    fixture.detectChanges();
  });

  it('should create with signup', () => {
    component.hasSignUp = true
    
    expect(component).toBeTruthy();
  });

  it('should create without signup', () => {
    component.hasSignUp = false
    expect(component).toBeTruthy();
  });

  it('should register a user', () => {
    loginService.signup(userTest).subscribe(data => {
      expect(data).toEqual(signupResp);
    })
  });

  it('should login a user', () => {
    loginService.login(userTest).subscribe(data => {
      expect(data).toEqual(loginResp);
    })
  });

  it('should call handleSignUp', () => {
    jest.spyOn(component, 'handleSignUp' as never);
    component.handleSignUp()
    expect(component.handleSignUp).toHaveBeenCalled()
  });

  it('should call send without signup', () => {
    component.hasSignUp = false
    jest.spyOn(component, 'send' as never);
    component.send()
    expect(component.send).toHaveBeenCalled()
  });

  it('should call getTitle with signup', () => {
    component.hasSignUp = true
    jest.spyOn(component, 'getTitle' as never);
    component.getTitle()
    expect(component.getTitle).toHaveBeenCalled()
  });

  it('should call getLabelLink with signup', () => {
    component.hasSignUp = true
    jest.spyOn(component, 'getLabelLink' as never);
    component.getLabelLink()
    expect(component.getLabelLink).toHaveBeenCalled()
  });
});
