import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {
  public isLogged: boolean;

  constructor( private router: Router ) {
    this.isLogged = !!sessionStorage.getItem( 'userData' );
    this.isLogged ? this.router.navigate( [ 'home' ] ) : this.router.navigate( [ '' ] );
  }

  ngDoCheck () {
    this.isLogged = !!sessionStorage.getItem( 'userData' );
  }

  logout (): void {
    sessionStorage.clear();
    this.router.navigate( [ 'login' ] );
  }
}
