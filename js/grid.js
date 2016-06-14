var wrapper = document.querySelector( ".work__list" );
var elements = document.querySelectorAll( ".work__elem" );
var overlay = document.querySelector( ".gallery-overlay" ); 
var closeBtn = document.querySelector( ".gallery-overlay__close-btn" );
var overlayContent = overlay.querySelectorAll( ".gallery-overlay--animate" );

var activeImage = null;



wrapper.addEventListener( "click", function( event ) {
  if( event.target.classList.contains( "work__elem" ) && event.target !== activeImage ) {
    showImage( event );
  }
});

function animateOvelayContent( delay ) {
  delay = delay || 0;
  setTimeout( function() {
    for( var i = 0; i < overlayContent.length; i++ ) {
      overlayContent[i].classList.toggle( "animate" );
    }
  }, delay );
}

function showImage( event ) {
  var el = event.target;
  var coords = el.getBoundingClientRect();
  console.log( coords );
  activeImage = el;

  var translateString = "translate(" + calculateTranslate( coords ).left + "px," + calculateTranslate( coords ).top + "px)";
  var scaleString = "scale(" + calculateScaleSize( coords ) + ")";
  
  function calculateScaleSize( coords ) {
    var width = coords.width;
    var heignt = coords.height;
    var scaleNumber;
    if( width >= heignt ) {
      var preferedWidth =( window.innerWidth / 2 ) - 50;
      scaleNumber = preferedWidth / width;
    }
    else {
      var preferedHeight = window.innerHeight - 100;
      scaleNumber = preferedHeight / heignt;
    }
    return scaleNumber;
  }
  
  function calculateTranslate( coords ) {
    var width = coords.width;
    var heignt = coords.height;
    var scale = calculateScaleSize( coords );
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
  
  function hideOtherImages( el ) {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i] == activeImage ) {
        continue;
      }
      else {
        elements[i].classList.add( "scale" );
      }
    }
  }
  function transformCheckedImage() {
    el.style.zIndex = 10;
    el.style.transform = translateString + scaleString;
  }
  function showOverlay() {
    overlay.classList.add( "showed" );
    setTimeout( function() {
      overlay.classList.add( "color" );
      animateOvelayContent( 400 );
    }, 100);
    denyBodyOverflow();
//    overlay.addEventListener( "transitionend", denyBodyOverflow);
//    setTimeout( function() {
//      denyBodyOverflow();
//    },100)
    function denyBodyOverflow( event ) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%";
      document.body.style.paddingRight = "17px";
//      this.removeEventListener( event.type, denyBodyOverflow );s
    }
  }
  
  hideOtherImages( el );
  transformCheckedImage();
  showOverlay();
//  setTimeout( function() {
//    clone( el, calculateScaleSize( coords ) );
//  }, 200 );
//  animateOvelayContent();
}






closeBtn.addEventListener( "click", showGallery );

function showGallery( event ) {
  
  function showOtherImages() {
    for( var i = 0; i < elements.length; i++ ) {
      if( elements[i].classList.contains( "active" ) ) {
        continue;
      }
      else {
        elements[i].classList.remove( "scale" );
      }
    }
  }
  function restoreBodyOverflow() {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }
  function hideOverlay() {
    overlay.classList.remove( "color" );
  }
  function hideCheckedImage( image ) {
    image.style.transform = "";
    image.style.width = "";
    image.style.height = "";
    image.addEventListener( "transitionend", onTransitionEnd );
    activeImage = null;
    
    function onTransitionEnd( event ) {
      this.style.zIndex = 0;
      this.removeEventListener( event.type, onTransitionEnd );
      overlay.classList.remove( "showed" );
    }
  }
  
  showOtherImages();
  setTimeout( function() {
    restoreBodyOverflow();
  }, 200 );
  hideOverlay();
  hideCheckedImage( activeImage );
  animateOvelayContent();
}