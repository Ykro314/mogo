"use strict";

var menu = new AnimatedMenu( document.querySelector( ".navigation__list" ) );
menu.init();

var od = new Meter( document.querySelectorAll( ".statistics__number" ) );
od.init();

function createPanels( panels ) {
  var array = [];
  for( var i = 0; i < panels.length; i++ ) {
    array[i] = new Panel( panels[i] );
  }
  return array;
}

var panelElements = createPanels( document.querySelectorAll( ".panel" ) );
//console.log( panelElements );
//var container = panelElements[0].container;
//
//container.addEventListener( "click", function( event ) {
//  if( event.target.classList.contains( "panel__heading" ) ) {
//    var a = event.target.parentElement;
//    panelElements.forEach( function( el, i, arr ) {
//      if( a == el.element ) {
//        el.open();
//      }
//    })
//    
//  }
//})