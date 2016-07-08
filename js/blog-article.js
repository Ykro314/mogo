(function(){
"use strict";
  
function BlogArticle( element ){
  this.article = element;
  
  
  this.expander = null;
  this.coords = null;
  
  
  this.clickHandler = this.clickHandler.bind( this );
  
  
  this.init();
}
  
  
  
BlogArticle.prototype.init = function(){
  this.article.addEventListener( "click", this.clickHandler );
}



BlogArticle.prototype.clickHandler = function( event ) {
  this.show();
}



BlogArticle.prototype.show = function() {
  this.animateContent();
  this.createExpandElement();
  this.expand();
}


BlogArticle.prototype.animateContent = function() {
  var content = this.article.querySelectorAll( ".animate-op" );
  Array.prototype.forEach.call( content, function( el ){
    el.classList.toggle( "fade-out" );
  });
}

BlogArticle.prototype.expand = function() {
  
  function calcTranslateCoords( coords ) {
    var translateX = -coords.left;
    var translateY = -coords.top;

    return {
      left: translateX,
      top: translateY
    }
  }

  function calcScale( coords ) {
    var scaleX = (window.innerWidth - 17 ) / coords.width;
    var scaleY = window.innerHeight / coords.height;

    return {
      scaleX: scaleX.toFixed( 2 ),
      scaleY: scaleY.toFixed( 2 )
    }
  }

  function pushStyles(){
    var translateString = "translate(" + translateCoords.left + "px, " + translateCoords.top + "px)";
    var scaleString = "scale(" + scaleCoords.scaleX + ", " + scaleCoords.scaleY + ")";

    this.expander.style.transform = translateString + scaleString;
    this.expander.style.zIndex = "20";
  }
  pushStyles = pushStyles.bind( this );
  
  this.coords = this.article.getBoundingClientRect();

  var translateCoords = calcTranslateCoords( this.coords );
  var scaleCoords = calcScale( this.coords );
  setTimeout( pushStyles, 500 );
}

BlogArticle.prototype.createExpandElement = function() {
  var expander = document.createElement( "div" );
  expander.classList.add( "expand" );
  this.article.appendChild( expander );

  this.expander = expander;
}



window.BlogArticle = BlogArticle;
  
})();