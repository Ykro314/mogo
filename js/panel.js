function Panel( element ) {
  this.element = element;
  this.container = element.parentElement;
  this.content = element.querySelector( ".panel__content" );
  this.scrollbar = element.querySelector( ".panel__scrollbar" );
  
  this.onClickHandler = this.onClickHandler.bind( this );
//  this.scrollbarDragAndDrop = this.scrollbarDragAndDrop.bind( this );
  this.dragHandler = this.dragHandler.bind( this );
  
  this.init();
}



Panel.prototype.init = function() {
  this.calculateScrollbarHeight();
  
  this.element.addEventListener( "click", this.onClickHandler );
}

Panel.prototype.onClickHandler = function( event ) {
  this.open();
  
  if( this.scrollbar.getBoundingClientRect().height ) {
    this.scrollbar.addEventListener( "mousedown", this.dragHandler );
  }
}

Panel.prototype.open = function() {
  if( this.element == this.activePanel ) {
    return;
  }
  else {
    Panel.prototype.activePanel.classList.remove( "panel--active" );
    this.element.classList.add( "panel--active" );
    
    Panel.prototype.activePanel = this.element;
    Panel.prototype.activePanel.removeEventListener( "mousedown", this.dragHandler );
//    Panel.prototype.activeScrollbar = this.activePanel.querySelector( ".panel__scrollbar" );
  }
}

Panel.prototype.calculateScrollbarHeight = function(){
  var realHeight = this.content.getBoundingClientRect().height;
  var visibleHeight = 160;
  
  this.scrollbar.style.height = setScrollbarHeight() + "px";
  
  function setScrollbarHeight() {
    var percentage = realHeight / 100;
    var scrollbarRatio = visibleHeight / percentage;
    var scrollHeight = scrollbarRatio * ( visibleHeight / 100 );
    
    if( scrollHeight > visibleHeight ) {
      scrollHeight = 0;
    }
    
    return scrollHeight;
  }
}



Panel.prototype.dragHandler = function( event ) {
  if( event.target.classList.contains( "panel__scrollbar" ) ) {
    this.scrollbarDragAndDrop( event );
  }
}



Panel.prototype.scrollbarDragAndDrop = function( event ) {
  event.preventDefault();
  var container = this.content;
  var scrollbar = this.scrollbar;
  
  var shiftY = event.clientY - scrollbar.getBoundingClientRect().top;
  
  document.addEventListener( "mousemove", move );
  document.addEventListener( "mouseup", function( event ) {
    document.removeEventListener( "mousemove", move );
  })
  
  function move( event ) {
    event.preventDefault();
    var containerCoordsTop = container.getBoundingClientRect().top;
    var scrollbarHeight = scrollbar.getBoundingClientRect().height;
    var visibleHeight = 160;
    
    var coordsRare = event.clientY - containerCoordsTop;
    var scrollbarPositionTop = coordsRare - shiftY;
    
    if( scrollbarPositionTop <= 0 ) {
      scrollbar.style.top = 0 + "px";
    }
    else if ( scrollbarPositionTop >= ( visibleHeight - scrollbarHeight) ) {
      scrollbar.style.top = visibleHeight - scrollbarHeight + "px";
    }
    else {
      scrollbar.style.top = scrollbarPositionTop + "px";
    }
  }
}

Panel.prototype.activePanel = document.querySelector( '.panel--active' );
























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

