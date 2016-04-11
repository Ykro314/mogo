"use strict";

var menu = new AnimatedMenu( document.querySelector( ".navigation__list" ) );
menu.ready();


//var el1 = document.querySelector( ".statistics__number--1" );
//var el2 = document.querySelector( ".statistics__number--2" );
//var el3 = document.querySelector( ".statistics__number--3" );
//var el4 = document.querySelector( ".statistics__number--4" );
//var el5 = document.querySelector( ".statistics__number--5" );
//
//var od1 = new Odometer({
//  el: el1,
//  value: 1
//});
//
//el1.innerHTML = 42;
//
//var od2 = new Odometer({
//  el: el2,
//  value: 1
//});
//
//el2.innerHTML = 123;
//
//var od3 = new Odometer({
//  el: el3,
//  value: 1
//});
//
//el3.innerHTML = 15;
//
//var od4 = new Odometer({
//  el: el4,
//  value: 1
//});
//
//el4.innerHTML = 999;
//
//var od5 = new Odometer({
//  el: el5,
//  value: 1
//});
//
//el5.innerHTML = 24;


//window.odometerOptions = {
//  duration: 10000
//};
var odometerElements = document.querySelectorAll( ".statistics__number" );

function createOdometerData( elements, value ) {
  var value = value || 1;
  var array = [];
  
  for( var i = 0; i < elements.length; i++ ) {
    array[i] = {
      el: elements[i],
      value: value,
      count: elements[i].textContent
    }
  }
  
  return array;
}

function createMeters( array ) {
  var odObjects = new Array( array.length );
  
  for( var i = 0; i < odObjects.length; i++ ) {
    odObjects[i] = new Odometer( array[i] );
    odObjects[i].update( array[i].count );
  }

  return odObjects;
}

var statistics = createOdometerData( odometerElements, 5 );
var odsArray = createMeters( statistics );


