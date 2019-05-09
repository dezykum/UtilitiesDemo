import { Directive, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCarouselSlide]'
})
export class CarouselSlideDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() { }

  @HostListener('mouseenter') onMouseOver(){
    console.log(this.elRef);

setTimeout( ()=>{
  this.renderer.setAttribute(this.elRef.nativeElement, 'src', '../../assets/images/lg_refrigerator.jpg' )
},700);

setTimeout( ()=>{
  this.renderer.setAttribute(this.elRef.nativeElement, 'src', '../../assets/images/whirlpool_refrigerator.png' )
},2000);

  }

  @HostListener('mouseleave') onMouseLeave(){
    console.log(this.elRef);
    setTimeout(()=>{
      this.renderer.setAttribute(this.elRef.nativeElement, 'src', '../../assets/images/refrigerator.jpg' )
    },0)
  }

}
