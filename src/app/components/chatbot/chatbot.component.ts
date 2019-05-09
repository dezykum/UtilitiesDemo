import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef , Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { DataStoreService } from '../../services/data-store.service';
import { ActivatedRoute } from '@angular/router';

// import {carouselData} from '../../../assets/carouselData.json';

import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component( {
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  animations: [
trigger('enterAnimation', [
  state('inactive', style({
    transform: 'translateY(100%)',
    opacity: 0
})),
state('active', style({
  transform: 'translateY(0%)',
  opacity: 1
})),
transition('inactive => active', animate('500ms', style({transform: 'translateY(0%)', opacity: 1}))),
transition('active => inactive', animate('500ms', style({transform: 'translateY(100%)', opacity: 0})))
])
],
  styleUrls: [ './chatbot.component.scss' ],
  encapsulation: ViewEncapsulation.Emulated
} )
export class ChatbotComponent implements OnInit {

  public message: string;
  public userMessageCollection: Array<string> = new Array;
  public chatConversation: Array<any> = new Array;
  public messageIndex: number;
  public isCaretUp: boolean;
  public isCaretDown: boolean;
  public state = 'active';
  public isStarDisabled = false;
  public intentName = '';
  public intentId = '';
  public displayStars:boolean = false;
  public displayCarousel: boolean = false;
  public carouselDataCollection = [];
  public carouselData = [];
  public selectedItem = '';
  public carouselList = [];
  public selectedIndex : any;
  paramval:{ name:String, intentnameVal: String};
  private url: string = 'https://directline.botframework.com/v3/directline/conversations';
  public convId:string;
  public i:number=0;

  // @ViewChild('carouselGuide') d1:ElementRef;

  constructor( private http: Http, private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef,
  private elRef: ElementRef, private renderer: Renderer2,public router: Router,private route: ActivatedRoute, public dataStore: DataStoreService) {
     //this.sendMessage( 'hi' );

  }

  ngOnInit () {

    this.paramval={

      name:this.route.snapshot.params['name'],
      intentnameVal:this.route.snapshot.params['intentid'],

     }
     //console.log(this.paramval.intentnameVal)


     if(typeof this.paramval.intentnameVal==="undefined"){

      this.paramval.name='John';
     }

     this.toggleChatBot(true);
  }



  welcomebutton = [];

  sendMessage ( postback?: any, event?: any ) {
    if ( this.message || postback ) {

      if(event!=undefined && event.srcElement.innerHTML.trim()=='Add to Cart' && this.selectedItem==''){

      }
      else{
        if ( postback ) {
          this.message = postback;
          if ( event && event.currentTarget.tagName === 'BUTTON' ) {
            // console.log("event: ",event.srcElement.innerHTML.trim());


              event.target.parentNode.querySelectorAll( 'button' ).forEach( ele => {
                // console.log("button : ", ele.innerHTML)
                ele.disabled = true;

                if ( event.target  ) {
                  ele.classList.remove( 'btn-primary' );
                  ele.classList.add( 'disabled' );
                }
              } );
              this.chatConversation.push( {
                'from': 'user', 'message': this.message, 'timeStamp': this.getTime()
              } );

          }
        } else {
          this.chatConversation.push( {
            'from': 'user', 'message': this.message, 'timeStamp': this.getTime()
          } );
          this.userMessageCollection.push( this.message );
          this.messageIndex = this.userMessageCollection.length;
          this.getCaretPos();
        }
        this.createChatConversation();
      }

    }
  }
  onSelect(query){
    this.sendMessage(query);
  }



  changeFunc(event){
    var newdateValue=event.value;
    var newdate = newdateValue.getFullYear() + '/' +(newdateValue.getMonth() + 1) + '/' + newdateValue.getDate()
    this.sendMessage(newdate);
    this.message =newdate


    this.message = null;
  }


  createChatConversation () {
    //const url = 'https://api.api.ai/v1/query?v=20150910';
    if(this.selectedItem!=='' && this.message=='add to cart'){
      this.message ="please add "+this.selectedItem+" to my cart";
    }
    if(this.message=='submit'){
        this.message ="Added "+this.selectedItem+" of $100 to my cart";
        this.selectedItem = ''
    }
    // console.log("message in query: ",this.message)
    const body = { 'query': this.message, 'lang': 'en', 'sessionId': 1234567890 };
    const headers = new Headers( {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer xAlNlptJi-0.oWvAYV8gveQItvNo1X7dEOV5tJifxrJMK2huA4kSgBY'

    } );

    const headernew = new Headers( {
      'Authorization': 'Bearer xAlNlptJi-0.oWvAYV8gveQItvNo1X7dEOV5tJifxrJMK2huA4kSgBY'

    })
    const options = new RequestOptions( { headers: headers } );
    const optionsNew = new RequestOptions( { headers: headernew } );
    const isEoc = this.message === 'call customer agent';
    var closeMsg = this.message;

    const response = {
      'type': 'message',
'from': {
  'id': "qwergth"
},
'text': this.message,
lang: 'en',
sessionId: '12345'
};
    //this.message = null;
    this.showResponsePreloader();
  var valueMessage = '';

if (this.message=='hi'){
     this.http.post( this.url, body, options ).subscribe( data => {
      this.convId = data.json().conversationId;
    this.http.post( this.url + '/' + this.convId + '/activities', response, options ).subscribe( d => {
      this.http.get( this.url + '/' + this.convId + '/activities', optionsNew ).subscribe( x => {

      console.log("get" , x.json());
  valueMessage = x.json();
//  this.cnt=x.json().activities.length;
  if (x.json().activities.length > 0){
    for (var a = 0; a < x.json().activities.length; a++) {
       var abc=x.json().activities[a] ;

       if (abc.from.id === "AVA-Demo"){
         this.chatConversation.push( {
          'from': 'bot', 'message': abc.text
        } );
       }
   //    this.http.delete( this.url + '/' + this.convId + '/activities/'+x.json().activities[a].id  );

    }

  }
      });

      });


    });
  }else{

    this.http.post( this.url + '/' + this.convId + '/activities', response, options ).subscribe( d => {
      this.http.post( this.url + '/' + this.convId + '/activities', response, options ).subscribe( d => {

      this.http.get( this.url + '/' + this.convId + '/activities', optionsNew ).subscribe( x => {

        console.log("get" , x.json());
    valueMessage = x.json();
  //  this.cnt=x.json().activities.length;
  if (x.json().activities.length % 2 != 0){
    this.createChatConversation();
  }
  if(x.json().activities.length> 0){

      var abc=x.json().activities[x.json().activities.length-1] ;

             if (abc.from.id === "AVA-Demo"){
               this.chatConversation.push( {
            'from': 'bot', 'message': abc.text

          } );

         }
     // for (var a = 0; a < x.json().activities.length; a++) {
       //    this.http.delete( this.url + '/' + this.convId + '/activities/'+x.json().activities[a].id  );
     // }

    }
        });
      });
    });

     }
this.message = null;
  }







  public getCurrentTime () {

    //var newName = this.paramval.name;
     var nameValue= this.paramval.name.substring(0, 1).toUpperCase() + this.paramval.name.substring(1);
      const d = new Date();
      const time = d.toLocaleTimeString();
      const currentTime = { time: time, message: '' };
      if ( d.getHours() < 12 ) {
          currentTime.message = 'Good Morning '+ nameValue + '! <br/>';
      } else if ( d.getHours() <= 12 && d.getHours() < 16 ) {
          currentTime.message = 'Good Afternoon '+ nameValue + '<br/>';
      } else {
          currentTime.message = 'Good Evening '+ nameValue + '!<br/>';
      }
      return currentTime;
  }

  showResponsePreloader () {
    // this.chatConversation.push( {
    //   'from': 'bot', message: '<img class="mx-auto loader" src="./assets/images/loading.gif" />',
    //   timeStamp: this.getTime()
    // } );
  }

  getMessageHistory ( func: string ) {
    const currentMessage = this.message;
    if ( this.messageIndex > 0 && func === 'up' ||
      ( this.messageIndex >= 0 && this.messageIndex < this.userMessageCollection.length - 1 && func === 'down' ) ) {
      this.messageIndex = func === 'up' ? this.messageIndex - 1 : this.messageIndex + 1;
    }
    this.message = this.messageIndex === this.userMessageCollection.length ?
      currentMessage : this.userMessageCollection[ this.messageIndex ];
    this.getCaretPos();
  }

  getTime (): string {
    const date = new Date;
    return date.toLocaleString( 'en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    } );
  }

  getCaretPos (): void {
    this.isCaretUp = !!( this.messageIndex > 0 );
    this.isCaretDown = !!( this.userMessageCollection.length - this.messageIndex > 1 );
  }

  minimizeChatBot(value: boolean){

    if(value){
      this.state = 'active';
    }
    else{
      this.state = 'inactive';
    }

  }

  toggleChatBot(value: boolean) {

    if (value) {
      this.state = 'active';
      if(this.chatConversation.length){ }
      else{
        this.sendMessage('hi');
      }

    } else {
      this.state = 'inactive';
      this.chatConversation.length=0;


    }
  }
 ngAfterViewInit() {
  this.cdr.detectChanges();
}


selectItem(itemName,item){
  this.selectedItem = itemName;
  this.selectedIndex = item;
}

}
