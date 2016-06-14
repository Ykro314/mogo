(function(){
"use strict";
  
function Gallery( element ) {
  this.element = element;
  this.images = element.querySelectorAll( ".work__elem" );
  this.overlay = new GalleryOverlay( document.querySelector( ".gallery-overlay" ) );
//  this.overlay = document.querySelector( ".gallery-overlay" );
//  this.overlayCloseBtn = this.overlay.querySelector( ".gallery-overlay__close-btn" );
//  this.overlayContent = this.overlay.querySelectorAll( ".gallery-overlay--animate" );
  
  this.activeImage = null;
  
  this.clickOnImageHandler = this.clickOnImageHandler.bind( this );
  this.clickOnCloseBtnHandler = this.clickOnCloseBtnHandler.bind( this );
}
  
  
Gallery.prototype.init = function() {
  this.element.addEventListener( "click", this.clickOnImageHandler );
  this.overlay.closeBtn.addEventListener( "click", this.clickOnCloseBtnHandler );
}
  

Gallery.prototype.clickOnImageHandler = function( event ) {
  if( event.target.classList.contains( "work__elem" ) && event.target !== this.activeImage ) {
    this.showImage( event );
  }
}

Gallery.prototype.clickOnCloseBtnHandler = function( event ) {
  this.showGallery( event );
}

Gallery.prototype.showGallery = function( event ) {
  function restoreBodyOverflow() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
  function hideOverlay( overlay ) {
    overlay.classList.remove( "color" );
  }
  function hideCheckedImage( image ) {
    var overlay = this.overlay.element;
    image.style.transform = "";
    image.style.width = "";
    image.style.height = "";
    image.addEventListener( "transitionend", onTransitionEnd );
    this.activeImage = null;
    
    function onTransitionEnd( event ) {
      this.style.zIndex = 0;
      overlay.classList.remove( "showed" );
      this.removeEventListener( event.type, onTransitionEnd );
    }
  }
  
//  showOtherImages();
  this.hideOtherImages( this.images, "remove" );
//  setTimeout( function() {
//    restoreBodyOverflow();
//  }, 200 );
//  hideOverlay( this.overlay );
  hideCheckedImage.call( this, this.activeImage );
  this.overlay.hide();
//  this.animateOvelayContent();
}


/********************************************
******************************************
***********************
*/

Gallery.prototype.showImage = function( event ) {
  this.activeImage = event.target;
  
  this.hideOtherImages( this.images, "add" );
  this.transformClickedImage( event.target );
//  this.showOverlay();
  this.overlay.show();
}


Gallery.prototype.hideOtherImages = function( imagesArray, act ) {
  for( var i = 0; i < imagesArray.length; i++ ) {
    if( imagesArray[i] == this.activeImage ) {
      continue;
    }
    else {
      if( act === "add" ) { 
        imagesArray[i].classList.add( "scale" );
      }
      else if( act === "remove" ) {
        imagesArray[i].classList.remove( "scale" );
      }
    }
  }
}
  
  
Gallery.prototype.transformClickedImage = function( clickedImg ) {
  
  function calculateScaleSize() {
    var scaleNumber;
    if( width >= heignt ) {
      var preferedWidth =( window.innerWidth / 2 ) - 50;
      scaleNumber = preferedWidth / width;
    }
    else {
      var preferedHeight = window.innerHeight - 100;
      scaleNumber = preferedHeight / heignt;
    }
    return scaleNumber.toFixed( 2 );
  }
  
  function calculateTranslate() {
    var translateX, translateY, gap;
    if( width >= heignt ) {
      var heightAfterScaling = heignt * scale;
      gap = ( window.innerHeight - heightAfterScaling ) / 2;
      translateY = ( -coords.top + gap );
      translateX = ( -coords.left + 50 );
    }
    else {
      var widthAfterScaling = width * scale;
      gap = ( ( window.innerWidth / 2 ) - widthAfterScaling ) / 2;
      translateX = ( -coords.left + gap + 200 );
      translateY = ( -coords.top + 200 );
    }
    return {
      left: translateX,
      top: translateY
    }
  }
  
  var coords = clickedImg.getBoundingClientRect();
  var width = coords.width;
  var heignt = coords.height;
  var scale = calculateScaleSize();
  var translateObj = calculateTranslate();
  
  var translateString = "translate(" + translateObj.left + "px," + translateObj.top + "px)";
  var scaleString = "scale(" + scale + ")";
  
  clickedImg.style.zIndex = 10;
  clickedImg.style.transform = translateString + scaleString;
}


//Gallery.prototype.showOverlay = function() {
//  
//  function denyBodyOverflow( event ) {
//    document.body.style.overflow = "hidden";
//    document.body.style.height = "100%";
//    document.body.style.paddingRight = "17px";
//  }
//  var overlay = this.overlay;
//  var animate = this.animateOvelayContent.bind( this );
//  overlay.classList.add( "showed" );
//  
//  setTimeout( function() {
//    overlay.classList.add( "color" );
//    animate( 400 );
//  }, 100);
//  
//  denyBodyOverflow();
//}

//Gallery.prototype.animateOvelayContent = function( delay ) {
//  delay = delay || 0;
//  var self = this;
//  setTimeout( function() {
//    for( var i = 0; i < self.overlayContent.length; i++ ) {
//      self.overlayContent[i].classList.toggle( "animate" );
//    }
//  }, delay );
//}





window.Gallery = Gallery;


})();