import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

@Injectable()
export class DataStoreService {

  public storedData = new Subject<any>();
  public cast = this.storedData.asObservable();

  constructor() {
  }

  set ( key: string, value: any ): void {
    this.storedData[ key ] = value;
    this.storedData.next( { key: value } );
  }

  get ( key: string ) {
    return this.storedData[ key ];
  }
  public urlParams = window.location.href;
  urlName = this.urlParams;
  

}