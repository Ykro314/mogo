(function(){
"use strict"

function Carousel( element ) {
  this.element = element;
  
  this.slidesWrapper = element.querySelector( ".carousel__wrapper" );
  this.slides = element.querySelectorAll( ".slide" );
  
  this.slidesShift = 100 / this.slides.length;
  this.wrapperWidth = 100 * this.slides.length;
  
  this.activeSlide = 0;
  
  this.clickHandler = this.clickHandler.bind( this );
  
  this.init();
}
  


Carousel.prototype.init = function() {
  this.setWidthParameters();
  this.element.addEventListener( "click", this.clickHandler );
}  


/**
* Sets width parameters of wrapper and slides with consideration amount of existing slides
*/
Carousel.prototype.setWidthParameters = function() {
  this.slidesWrapper.style.width = this.wrapperWidth + "%";
  
  for( var i = 0; i < this.slides.length; i++ ) {
    this.slides[i].style.width = this.slidesShift + "%";
  }
}


Carousel.prototype.clickHandler = function( event ) {
  
  if( event.target.getAttribute( "data-direction" ) === "left" ) {
    this.showSlide( this.activeSlide + 1 );
  }
  else if( event.target.getAttribute( "data-direction" ) === "right" ) {
    this.showSlide( this.activeSlide - 1 );
  }
}


/**
* Shows current slide
* @param {number} index
*/
Carousel.prototype.showSlide = function( index ) {
  function addArrowCancelAnimation( arrow, className ) {
    arrow.classList.add( className );
    arrow.addEventListener( "animationend", function( event ) {
      this.classList.remove( className );
    })
  }
  
  if( index > 0 || index <= ( this.slides.length * -1 ) ) {
    addArrowCancelAnimation( event.target, "cancel-flipping" );
    return;
  }
  else {
    this.slidesWrapper.style.transform = "translateX(" + this.slidesShift * index  + "%)";
    this.activeSlide = index;
  }
}
  
  

window.Carousel = Carousel;
  
})();