import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router ) { }
  canActivate ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    return true;
  }
}

