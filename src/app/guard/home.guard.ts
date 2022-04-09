import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  
  constructor (private _cookieService: CookieService, private _router: Router) {

  }

  redirect(flag: boolean) {
    if(!flag) {
      this._router.navigate(['/', 'login'])
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const tokenCookie = this._cookieService.check('token')
      
      if(!tokenCookie) {
        this._router.navigate(['/', 'login'])
      } 
      return tokenCookie
  }
  
}
