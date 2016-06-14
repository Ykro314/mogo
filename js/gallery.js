(function(){
  
"use strict";
  
function Gallery( element ) {
  this.element = element;
  this.images = element.querySelectorAll( ".work__elem" );
  this.overlay = new GalleryOverlay( document.querySelector( ".gallery-overlay" ) );
  
  this.activeImage = null;
  
  this.clickOnImageHandler = this.clickOnImageHandler.bind( this );
  this.clickOnCloseBtnHandler = this.clickOnCloseBtnHandler.bind( this );
}
  


Gallery.prototype.init = function() {
  this.element.addEventListener( "click", this.clickOnImageHandler );
}

Gallery.prototype.clickOnImageHandler = function( event ) {
  if( event.target.classList.contains( "work__elem" ) && event.target !== this.activeImage ) {
    this.showImage( event );
  }
}

Gallery.prototype.clickOnCloseBtnHandler = function( event ) {
  this.showGallery( event );
}



Gallery.prototype.showImage = function( event ) {
  this.activeImage = event.target;
  
  this.toggleImagesState( this.images, "add" );
  this.transformClickedImage( event.target );
  
  this.overlay.show();
  this.overlay.closeBtn.addEventListener( "click", this.clickOnCloseBtnHandler );
}


Gallery.prototype.showGallery = function( event ) {
  
  function hideCheckedImage( image ) {
    
    
    function onTransitionEnd( event ) {
      
      
      function disableOverlay( event ) {
        this.overlay.element.classList.remove( "showed" );
        image.style.zIndex = 0;
//        this.overlay.restoreBodyOverflow();
      }
      disableOverlay = disableOverlay.bind( this );
      
      
      image.style.transform = "";
      this.toggleImagesState( this.images, "remove" );
      this.overlay.element.classList.remove( "color" );
      
      setTimeout( disableOverlay, 500 );
      content.removeEventListener( event.type, onTransitionEnd );
    }
    onTransitionEnd = onTransitionEnd.bind( this );

    
    var content = this.overlay.content[0];
    content.addEventListener( "transitionend", onTransitionEnd );
  }
  
  hideCheckedImage.call( this, this.activeImage );
  this.activeImage = null;
  
  this.overlay.hide();
  this.overlay.closeBtn.removeEventListener( "click", this.clickOnCloseBtnHandler );
}


Gallery.prototype.toggleImagesState = function( imagesArray, act ) {
  for( var i = 0; i < imagesArray.length; i++ ) {
    
    if( imagesArray[i] == this.activeImage ) {
      continue;
    }
    else {
        imagesArray[i].classList[act]( "scale" );
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
      translateX = ( -coords.left + gap + 50 );
      translateY = ( -coords.top + 50 );
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



window.Gallery = Gallery;

})();