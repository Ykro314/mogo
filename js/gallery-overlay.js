(function(){
"use strict";

function GalleryOverlay( element ) {
  this.element = element;
  this.closeBtn = element.querySelector( ".gallery-overlay__close-btn" );
  this.content = element.querySelectorAll( ".gallery-overlay--animate" );
} 
  
GalleryOverlay.prototype.show = function() {
  this.element.classList.add( "showed" );
  var self = this;
  setTimeout( function() {
    self.element.classList.add( "color" );
    self.animateOvelayContent( 400 );
  }, 100);
  this.blockBodyOverflow();
}

GalleryOverlay.prototype.hide = function() {
  var self = this;
  
  this.element.classList.remove( "color" );
  setTimeout( function() {
    self.restoreBodyOverflow();
  }, 200 );
  this.animateOvelayContent();
}

GalleryOverlay.prototype.animateOvelayContent = function( delay ) {
  delay = delay || 100;
  var self = this;
  setTimeout( function() {
    for( var i = 0; i < self.content.length; i++ ) {
      self.content[i].classList.toggle( "animate" );
    }
  }, delay );
}

GalleryOverlay.prototype.blockBodyOverflow = function() {
  document.body.classList.add( "overflow-blocked" );
}

GalleryOverlay.prototype.restoreBodyOverflow = function() {
  document.body.classList.remove( "overflow-blocked" );
}
  
window.GalleryOverlay = GalleryOverlay;
  
})();