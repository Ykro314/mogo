(function(){
"use strict";

function GalleryOverlay( element ) {
  this.element = element;
  this.closeBtn = element.querySelector( ".gallery-overlay__close-btn" );
  this.content = element.querySelectorAll( ".gallery-overlay--animate" );
  
  this.currentData = null;
} 
  
  
  
GalleryOverlay.prototype.show = function() {
  
  function showOverlayAnimateContent() {
    this.element.classList.add( "color" );
    this.animateOvelayContent( 400 );
  }
  showOverlayAnimateContent = showOverlayAnimateContent.bind( this );
  
  this.fillOverlayWithData();
  this.element.classList.add( "showed" );
  this.blockBodyOverflow();
  setTimeout( showOverlayAnimateContent, 100);
}


GalleryOverlay.prototype.hide = function() {
  
//  function hideOverlay() {
//    this.restoreBodyOverflow();
////    this.element.classList.remove( "color" );
//  }
//  hideOverlay = hideOverlay.bind( this );
  
  this.animateOvelayContent( 100 );
  setTimeout( this.restoreBodyOverflow, 900 );
}


GalleryOverlay.prototype.fillOverlayWithData = function() {
  if( !this.currentData ) {
    return;
  }
  var header = this.element.querySelector( "h2" );
  var body = this.element.querySelector( "p" );
  
  header.textContent = this.currentData.header;
  body.textContent = this.currentData.body;
}

GalleryOverlay.prototype.animateOvelayContent = function( delay ) {
  
  function animateContent() {
    for( var i = 0; i < this.content.length; i++ ) {
      this.content[i].classList.toggle( "animate" );
    }
  }
  animateContent = animateContent.bind( this );
  delay = delay || 50;
  
  setTimeout( animateContent, delay );
}


GalleryOverlay.prototype.blockBodyOverflow = function() {
  document.body.classList.add( "overflow-blocked" );
}


GalleryOverlay.prototype.restoreBodyOverflow = function() {
  document.body.classList.remove( "overflow-blocked" );
}
  


window.GalleryOverlay = GalleryOverlay;
  
})();