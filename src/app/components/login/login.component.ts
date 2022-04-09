import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from 'src/app/services/login.service';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin!: FormGroup;
  public hasSignUp: boolean = false

  constructor(private readonly _loginService: LoginService,
    private readonly formBuilder: FormBuilder,
    private readonly _cookieService: CookieService,
    private readonly _router: Router) { }

  ngOnInit(): void {
    this.getForm()
  }

  getTitle() {
    return this.hasSignUp ? "Crear cuenta" : "Iniciar sesión"
  }

  getLabelLink() {
    return this.hasSignUp ? "Iniciar sesión" : "Crear cuenta"

  }

  handleSignUp() {
    this.getForm()
    this.formLogin.controls["authorid"].clearValidators();
    this.hasSignUp = !this.hasSignUp
    if (this.hasSignUp) {
      this.formLogin.controls["authorid"].setValidators(Validators.required);
    }
  }

  getForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      authorid: []
    })
  }

  send() {
    console.log(this.formLogin?.value)
    let loginForm: IUser = this.formLogin.value
    if (!this.hasSignUp) {
      this._loginService.login(loginForm).subscribe((data) => {
        
        if (data.success) {
          this._cookieService.set('token', data.data.jwt)
          this._cookieService.set('author_id', data.data.authorid)
          alert("Bienvenido")
          this._router.navigate(["/home"]);
        }
        data.message && alert(data.message)
      });
      return
    }

    if (this.hasSignUp) {
      this._loginService.signup(loginForm).subscribe((data) => {
        data.message && alert(data.message)
        if (data.success) {
          this.handleSignUp()
        }
      });
      return
    }

  }

}
