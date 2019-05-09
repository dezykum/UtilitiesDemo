import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataStoreService } from './../../services/data-store.service';
import { userData } from './login.config';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor( private fb: FormBuilder, private router: Router ) {
  }

  ngOnInit () {
    this.loginForm = this.fb.group( {
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    } );
  }

  isValidUser (): void {
    let formData;
    let sessionData;
    const data = userData;
    if ( this.loginForm.valid ) {
      formData = this.loginForm.value;
      if ( data[ formData.username ] && data[ formData.username ].password === formData.password ) {
        sessionData = {
          'id': formData.username,
          'role': data[ formData.username ].role
        };
        sessionStorage.setItem( 'userData', JSON.stringify( sessionData ) );
        this.router.navigate( [ 'home' ] );
      } else {
        alert( 'invalid credentials' );
      }
    }
    this.loginForm.markAsTouched();
  }

}
