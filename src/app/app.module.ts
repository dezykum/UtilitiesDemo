import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';


//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DataStoreService } from './services/data-store.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemHighlighterDirective } from './directives/item-highlighter.directive';
import { CarouselSlideDirective } from './directives/carousel-slide.directive';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import {StarRatingModule} from 'angular-star-rating';



const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'bot/:name/:intentid',component:HomeComponent},
  // { path: 'login', component: LoginComponent, canActivate: [ AuthGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: HomeComponent },
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ChatbotComponent,
    SafeHtmlPipe,
    ItemHighlighterDirective,
    CarouselSlideDirective,
    CarouselSlideDirective,
    ItemHighlighterDirective
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot( routes ),
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    SlickCarouselModule,
    StarRatingModule.forRoot()
    
  ],
  providers: [DataStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
