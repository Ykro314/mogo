(function(){
  
"use strict"


function Panel( element ) {
  this.element = element;
  this.cont = document.querySelector( ".skills" );
  this.container = element.parentElement; /*not in usage*/
  this.content = element.querySelector( ".panel__content" );
  this.text = element.querySelector( ".panel__text" );
  this.scrollbar = element.querySelector( ".panel__scrollbar" );
  
  this.imageDataNumber = null;
  
  this.VISIBLE_HEIGHT = this.content.getBoundingClientRect().height;
  this.VISIBLE_1_PERCENT = this.VISIBLE_HEIGHT / 100;
  
  this.REAL_HEIGHT = this.text.getBoundingClientRect().height;
  this.REAL_1_PERCENT = this.REAL_HEIGHT / 100;
  
  this.onClickHandler = this.onClickHandler.bind( this );
  this.mousedownHandler = this.mousedownHandler.bind( this );
  
  this.init();
}



Panel.prototype.init = function() {
  this.calculateScrollbarHeight();
  
  this.element.addEventListener( "click", this.onClickHandler );
}


/**
* Calculates height of scrollbar element considering ratio of visible height and real textElement height.
*/
Panel.prototype.calculateScrollbarHeight = function(){
  function setScrollbarHeight() {
    var scrollbarRatio = this.VISIBLE_HEIGHT / this.REAL_1_PERCENT;
    var scrollHeight = scrollbarRatio * ( this.VISIBLE_HEIGHT / 100 );
    
    if( scrollHeight > this.VISIBLE_HEIGHT ) {
      scrollHeight = 0;
    }
    
    return scrollHeight;
  }
  
  this.scrollbar.style.height = setScrollbarHeight.call( this ) + "px";
  
}


Panel.prototype.onClickHandler = function( event ) {
  this.open();
  
  if( this.scrollbar.getBoundingClientRect().height ) {
    this.scrollbar.addEventListener( "mousedown", this.mousedownHandler);
  }
}


/**
* Opens clicked panel and initializes event listeners, changes active image with proper animation.
*/
Panel.prototype.open = function() {
  
  function changeActiveImage() {
    Panel.prototype.activeImage.classList.remove( "skills__image--active" );
    this.img.classList.add( "skills__image--active" );

    Panel.prototype.activeImage = this.img;
  }
  
  function changeActivePanel() {
    Panel.prototype.activePanel.classList.remove( "panel--active" );
    this.element.classList.add( "panel--active" );

    Panel.prototype.activePanel = this.element;
    Panel.prototype.activePanel.removeEventListener( "mousedown", this.mousedownHandler );
  }  
  
  function animateImageChange() {
    var a = this.activePanel.getAttribute( "data-index" );
    var b = this.element.getAttribute( "data-index" );
    
    var img = this.img;
    var activeImg = this.activeImage;
    
    switch ( a - b ) {
      case -1:
        this.img.classList.remove( "skills__image--hidden" );
        break;
      case -2: 
        setTimeout( function() {
          img.classList.remove( "skills__image--hidden" );;
        }, 130 );
        this.img.previousElementSibling.classList.remove( "skills__image--hidden" );
        break;
      case 1: 
        this.activeImage.classList.add( "skills__image--hidden" );
        break;
      case 2: 
        setTimeout( function(){
          activeImg.previousElementSibling.classList.add( "skills__image--hidden" );
        }, 130 );
        this.activeImage.classList.add( "skills__image--hidden" );
        break;
    }
  }
  
  
  if( this.element === this.activePanel ) {
    return;
  }
  else {
    animateImageChange.call( this )
    changeActivePanel.call( this );
    changeActiveImage.call( this );
    
  }
}


Panel.prototype.mousedownHandler = function( event ) {
  if( event.target.classList.contains( "panel__scrollbar" ) ) {
    this.scrollbarDragAndDrop( event );
  }
}


/**
* Activates drag and drop on scrollbar element.
* @param {object} event
*/
Panel.prototype.scrollbarDragAndDrop = function( event ) {
  event.preventDefault();
  
  var shiftY = event.clientY - this.scrollbar.getBoundingClientRect().top;
  moveScrollbar = moveScrollbar.bind( this );
  
  document.addEventListener( "mousemove", moveScrollbar );
  document.addEventListener( "mouseup", function( event ) {
    document.removeEventListener( "mousemove", moveScrollbar );
  })
  
  function moveScrollbar( event ) {
    event.preventDefault();
    var containerCoordsTop = this.content.getBoundingClientRect().top;
    var scrollbarHeight = this.scrollbar.getBoundingClientRect().height;
    
    var coordsRare = event.clientY - containerCoordsTop;
    var scrollbarPositionTop = coordsRare - shiftY;
    
    if( scrollbarPositionTop <= 0 ) {
      this.scrollbar.style.top = 0 + "px";
    }
    else if ( scrollbarPositionTop >= ( this.VISIBLE_HEIGHT - scrollbarHeight) ) {
      this.scrollbar.style.top = this.VISIBLE_HEIGHT - scrollbarHeight + "px";
    }
    else {
      this.scrollbar.style.top = scrollbarPositionTop + "px";
      
      this.moveTextBlock( scrollbarPositionTop );
    }
  }
}


/**
* Moves text element (scrolling emulation, works with scrollbarDragAndDrop)
* @param {number} scrollbarShiftCoord
*/
Panel.prototype.moveTextBlock = function( scrollbarShiftCoord ) {
  var shiftRatio = scrollbarShiftCoord / this.VISIBLE_1_PERCENT;
  
  this.text.style.top = - ( shiftRatio * this.REAL_1_PERCENT +  ( shiftRatio / 2 ) )  + "px";
}



Panel.prototype.activePanel = document.querySelector( '.panel--active' );
Panel.prototype.activeImage = document.querySelector( ".skills__image--active" );


  
window.Panel = Panel;

})();






















//var panel = document.querySelector( ".skills__feature-panels" );
//var panelActive = document.querySelector( ".panel--active" );
//
//panel.addEventListener( "click", function( event ) {
//  var target = event.target;
//  
//  while( target !== this ) {
//    
//    if( target.classList.contains( "panel__heading" ) ) {
//      var currentPanel = target.parentElement;
//      
//      if( currentPanel != panelActive ) {
//        move( panelActive, currentPanel );
//      }
//      
//      function move( panel, current ) {
//        panel.classList.remove( "panel--active" );
//        current.classList.add( "panel--active" );
//        panelActive = current;
//      }
//      return;
//    }
//    
//    target = target.parentElement;
//  }
//  
//});

