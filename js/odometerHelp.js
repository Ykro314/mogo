(function(){
  
"use strict"

function Meter( elements ) {
  this.elements = elements;
  this.dataArray = [];
  this.isLaunched = false;
//  this.scrollTimeout = null;
  
  this.onScrollHandler = this.onScrollHandler.bind( this );
//  this.debounce = this.debounce.bind( this );
}

  
  
/**
* Creates object with options for each odometer component and pushes it into array.
* @param {number} value
*/
Meter.prototype.createOdometerData = function( value ) {
  var value = value || 1;
  
  for( var i = 0; i < this.elements.length; i++ ) {
    this.dataArray[i] = {
      el: this.elements[i],
      value: value,
      count: this.elements[i].textContent
    }
  }
}


/**
* Launches odometers using created dataArray.
*/
Meter.prototype.launchOdometer = function() {
  this.odometerObjects = new Array( this.dataArray.length );
  
  for( var i = 0; i < this.odometerObjects.length; i++ ) {
    this.odometerObjects[i] = new Odometer( this.dataArray[i] );
    this.odometerObjects[i].update( this.dataArray[i].count );
  }
}


/** 
* Not in usage
*/
//Meter.prototype.debounce = function() {
//  clearTimeout( this.scrollTimeout );
//  this.scrollTimeout = setTimeout( this.onScrollHandler, 70 );
//}


Meter.prototype.onScrollHandler = function( event ) {
  var el = document.querySelector( ".statistics__number" );
  var topCoords = el.getBoundingClientRect().top;
  
  if( this.isLaunched ) {
    return;
  }
  else if ( !this.isLaunched && window.innerHeight > topCoords ) {
    this.createOdometerData();
    this.launchOdometer();
    this.isLaunched = true;
    this.stop();
  }
}


Meter.prototype.init = function() {
  document.addEventListener( "scroll", this.onScrollHandler );
}


/**
* Removes scrollHandler. Prevents launching in future.
*/
Meter.prototype.stop = function() {
  document.removeEventListener( "scroll", this.onScrollHandler );
  this.isLaunched = false;
}

window.Meter = Meter;
  
})();


//var odometerElements = document.querySelectorAll( ".statistics__number" );
//
//function createOdometerData( elements, value ) {
//  var value = value || 1;
//  var array = [];
//  
//  for( var i = 0; i < elements.length; i++ ) {
//    array[i] = {
//      el: elements[i],
//      value: value,
//      count: elements[i].textContent
//    }
//  }
//  
//  return array;
//}
//
//function createMeters( array ) {
//  var odObjects = new Array( array.length );
//  
//  for( var i = 0; i < odObjects.length; i++ ) {
//    odObjects[i] = new Odometer( array[i] );
//    odObjects[i].update( array[i].count );
//  }
//
//  return odObjects;
//}
//
//var statistics = createOdometerData( odometerElements, 5 );
//var odsArray = createMeters( statistics );