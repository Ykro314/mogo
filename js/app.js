"use strict";



/*Menu compontent*/

var menu = new AnimatedMenu( document.querySelector( ".navigation__list" ) );
menu.init();



/*Odometer component*/

//var od = new Meter( document.querySelectorAll( ".statistics__number" ) );
//od.init();




/*Scrollbar Panels component*/

function createPanels( panels ) {
  var array = [];
  var panelImages = document.querySelectorAll( ".skills__feature-images img" );
  for( var i = 0; i < panels.length; i++ ) {
    array[i] = new Panel( panels[i] );
    array[i].element.setAttribute( "data-index", i + 1 );
    array[i].img = panelImages[i];
    array[i].index = i + 1;
  }
  return array;
}

var panelElements = createPanels( document.querySelectorAll( ".panel" ) );



/*Carousel component*/
function createComponents( componentsNodeList, callback ) {
  var array = [];

  for( var i = 0; i < componentsNodeList.length; i++ ) {
    callback( array, i, componentsNodeList);
  }

  return array;
}

function createCarousels( array, index, nodeList ) {
  array[index] = new Carousel( nodeList[index] );
}

var carouselsArray = createComponents( document.querySelectorAll( ".carousel" ), createCarousels );