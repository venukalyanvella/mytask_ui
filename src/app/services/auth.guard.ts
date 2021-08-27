import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth:AuthService,private router:Router){}
  canActivate() {
    if(this._auth.isLoggedIn()){
      return true
    }
    this.router.navigateByUrl('/login')
    return false
  }
  
}
