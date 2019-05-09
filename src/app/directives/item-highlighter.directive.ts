import { Directive, OnInit, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appItemHighlighter]'
})
export class ItemHighlighterDirective {

  elementList=[];

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') onMouseOver(){
    console.log(this.elRef);
    console.log(this.elementList)

    this.elementList[this.elementList.length]= this.elRef;
    console.log(this.elementList.length)

if(this.elementList.length > 1){

  for(let i =0; i< this.elementList.length; i++){
    console.log(this.elementList[i])
    this.renderer.setStyle(this.elementList[i], 'border','0px')
  }
}


    this.renderer.setStyle(this.elRef.nativeElement, 'border','3px solid grey')


  }


}
