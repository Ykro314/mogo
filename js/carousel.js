(function(){
"use strict"

function Carousel( element ) {
  this.element = element;
  
  this.slidesWrapper = element.querySelector( ".carousel__wrapper" );
  this.slides = element.querySelectorAll( ".slide" );
  
  this.slidesShift = 100 / this.slides.length;
  this.wrapperWidth = 100 * this.slides.length;
  
  this.activeSlide = 0;
  this.timeoutID = null;
  this.debounceTimeout = null;
  this.TIMEOUT_DURATION = 10000;
  
  this.clickHandler = this.clickHandler.bind( this );
  this.mouseDownHandler = this.mouseDownHandler.bind( this );
  
  this.debounce = this.debounce.bind( this );
  this.onScrollHandler = this.onScrollHandler.bind( this );
  this.changeSlideOnTimeout = this.changeSlideOnTimeout.bind( this );
  
  this.init();
}
  

Carousel.prototype.init = function() {
  this.setWidthParameters();
  this.element.addEventListener( "mousedown", this.mouseDownHandler );
  this.element.addEventListener( "click", this.clickHandler );
  document.addEventListener( "scroll", this.debounce );
}  


Carousel.prototype.debounce = function() {
  clearTimeout( this.debounceTimeout );
  this.debounceTimeout = setTimeout( this.onScrollHandler, 200 );
}

Carousel.prototype.onScrollHandler = function() {
  var topCoords = this.element.getBoundingClientRect().top;
  
  if ( window.innerHeight > topCoords ) {
    this.refreshTimeout();
    document.removeEventListener( "scroll", this.debounce );
  }
  else {
    return;
  }
}

Carousel.prototype.refreshTimeout = function() {
  clearTimeout( this.timeoutID );
  this.timeoutID = setTimeout( this.changeSlideOnTimeout, this.TIMEOUT_DURATION + 5000 );
}


Carousel.prototype.changeSlideOnTimeout = function() {
  var index = this.activeSlide - 1;
  
  if( index <= -(this.slides.length) ) {
    index = 0;
  }
  
  this.slidesWrapper.style.transform = "translateX(" + this.slidesShift * index  + "%)";
  this.activeSlide = index;
  this.timeoutID = setTimeout( this.changeSlideOnTimeout, this.TIMEOUT_DURATION );
}



Carousel.prototype.mouseDownHandler = function( event ) {
  if( event.target.classList.contains( "carousel__arrow" ) ) {
    event.target.classList.add( "mousedown" );  
    this.refreshTimeout();
  }
}


/**
* Sets width parameters of wrapper and slides with consideration amount of existing slides. By default css styles were setted  for using 3 slides.
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
* Shows choosed slide and adds animation to clicked arrow.
* @param {number} index
*/
Carousel.prototype.showSlide = function( index ) {
  function addArrowAnimation( arrow, className ) {
    
    function removeClassAndListener( event ) {
      this.classList.remove( className );
      this.removeEventListener( event.type, removeClassAndListener )
    }
    
    arrow.classList.add( className );
    arrow.addEventListener( "animationend", removeClassAndListener );
  }
  
  event.target.classList.remove( "mousedown" );
  
  if( index > 0 || index <= -( this.slides.length ) ) {
    addArrowAnimation( event.target, "cancel-flipping" );
    return;
  }
  else {
//    addArrowAnimation( event.target, "clicked" );
    this.slidesWrapper.style.transform = "translateX(" + this.slidesShift * index  + "%)";
    this.activeSlide = index;
  }
}
  
  

window.Carousel = Carousel;
  
})();