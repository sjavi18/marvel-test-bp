import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login/login.service';
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

  /**
   * It depends on how the form is viewed, it shows the title for it
   * @returns 
   */
  getTitle() {
    return this.hasSignUp ? "Crear cuenta" : "Iniciar sesión"
  }

  /**
   * It depends on how the form is viewed, it shows the title for the user creation or login link
   * @returns 
   */
  getLabelLink() {
    return this.hasSignUp ? "Iniciar sesión" : "Crear cuenta"

  }

  /**
   * in case it is user creation, create a required validator for the author field
   */
  handleSignUp() {
    this.getForm()
    this.formLogin.controls["authorid"].clearValidators();
    this.hasSignUp = !this.hasSignUp
    if (this.hasSignUp) {
      this.formLogin.controls["authorid"].setValidators(Validators.required);
    }
  }

  /**
   * create the form group for login / signup
   */
  getForm() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      authorid: []
    })
  }

  /**
   * If it is login, and the response from the service was correct, navigate to the home screen, if it is signup, 
   * register the new user and redirect to login
   * @returns 
   */
  send() {
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
