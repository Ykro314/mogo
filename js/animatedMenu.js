(function(){
"use strict";

var AnimatedMenu = function( menuElement ) {
  this.element = menuElement;
  this.underline = menuElement.querySelector( ".navigation__line" );
  
  this.mouseOverHandler = this.mouseOverHandler.bind( this );
  this.mouseOutHandler = this.mouseOutHandler.bind( this );
}


/**
* Moves underline to the hovered element
* @param {object} event
*/
AnimatedMenu.prototype.moveUnderline = function( event ) {
  var targetCoords = event.target.getBoundingClientRect();
  var menuCoords = this.element.getBoundingClientRect();
  var targetPadding = 20;
  var underlineOffset = 60;
  
  this.underline.style.width = targetCoords.width - targetPadding + "px";
  this.underline.style.transform = "translateX(" + ( targetCoords.left - menuCoords.left + underlineOffset ) + "px)";
}


/**
* Hides underline
* @param {object} event
*/
AnimatedMenu.prototype.hideUnderline = function( event ) {
  this.underline.style.transform = "";
  this.underline.style.width = "20px";
}


AnimatedMenu.prototype.init = function() {
  this.element.addEventListener( "mouseover", this.mouseOverHandler );
  this.element.addEventListener( "mouseout", this.mouseOutHandler );
}


AnimatedMenu.prototype.mouseOverHandler = function( event ) {
  if( event.target.tagName.toLowerCase() === "a" ) {
    this.moveUnderline( event );
  }
}


AnimatedMenu.prototype.mouseOutHandler = function( event ) {
  if( event.relatedTarget.classList.contains( "inner" ) ) {
    this.hideUnderline( event );
  }
}



window.AnimatedMenu = AnimatedMenu;
  
})();
 



