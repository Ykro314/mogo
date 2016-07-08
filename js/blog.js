(function(){
"use strict";
  
function Blog( element ){
  this.element = element;
  this.articlesWrapper = element.querySelector( ".blog__articles-wrapper" );
  this.articles = element.querySelectorAll( ".blog__article" );
  
  this.clickOnArticleHadler = this.clickOnArticleHadler.bind( this );
}
  
  
  
Blog.prototype.init = function(){
//  this.articlesWrapper.addEventListener( "click", this.clickOnArticleHadler )
  for( var i = 0; i < this.articles.length; i++ ) {
    new BlogArticle( this.articles[i] );
  }
}


Blog.prototype.clickOnArticleHadler = function( event ){
  if( event.target.classList.contains( "blog__article" ) ){
    this.expandElement( event.target );
  } 
  else if( event.target.parentElement.classList.contains( "blog__article" ) ) {
    this.expandElement( event.target.parentElement );
  }
}


Blog.prototype.expandElement = function( article ) {
  
  function animateContent() {
    var content = article.querySelectorAll( ".animate-op" );
    Array.prototype.forEach.call( content, function( el ){
      el.classList.toggle( "fade-out" );
    })
  }
  
  function createExpandElement() {
    var expander = document.createElement( "div" );
    expander.classList.add( "expand" );
    article.appendChild( expander );
    
    return expander;
  }
  
  function expand( expandEl ) {
    
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
      
      expandEl.style.transform = translateString + scaleString;
      expandEl.style.zIndex = "20";
    }
    
    var coords = article.getBoundingClientRect();
    
    var translateCoords = calcTranslateCoords( coords );
    var scaleCoords = calcScale( coords );
    setTimeout( pushStyles, 500 );
  }
  
  animateContent();
  var expander = createExpandElement(); 
  expand( expander );
}


window.Blog = Blog;
  
})()



//
//var grid = document.querySelector( ".blog__articles-wrapper" );
//var gridElements = document.querySelectorAll( ".blog__article" );
//
//function doSomething( event ) {
//  
//  function hideContent( contentList ) {
//    Array.prototype.forEach.call( contentList, function( el ){
//      el.classList.toggle( "fade-out" );
//    })
//  }
//  
//  function expandCell( cell ){
//    
//    function calcTranslateCoords( coords ) {
//      var translateX = -coords.left;
//      var translateY = -coords.top;
//      
//      return {
//        left: translateX,
//        top: translateY
//      }
//    }
//    
//    function calcScale( coords ) {
//      var scaleX = (window.innerWidth - 17 ) / coords.width;
//      var scaleY = window.innerHeight / coords.height;
//      return {
//        scaleX: scaleX.toFixed( 2 ),
//        scaleY: scaleY.toFixed( 2 )
//      }
//    }
//    
//    var cellCoords = cell.getBoundingClientRect();
//    var translCoords = calcTranslateCoords( cellCoords );
//    var scaleCoords = calcScale( cellCoords );
//    var expandEl = cell.querySelector( ".expand" );
//    expandEl.style.transform = "translate3d( " + translCoords.left + "px, " + translCoords.top + "px, 0) scale(" + scaleCoords.scaleX + ", " + scaleCoords.scaleY + ")";
//    expandEl.style.zIndex = "100";
//  }
//  
//  var element = this;
//  var animateContent = element.querySelectorAll( ".animate-op" );
//  var coords = element.getBoundingClientRect();
//  hideContent( animateContent );
//  setTimeout( function(){
//    expandCell( element );
//  }, 1000 );
//};

//
//(function init(){
//  for( var i = 0; i < gridElements.length; i++ ) {
//    gridElements[i].addEventListener( "click", doSomething );
//  }
//})();
