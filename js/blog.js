(function(){
"use strict";
  
function Blog( element ){
  this.element = element;
  this.articlesWrapper = element.querySelector( ".blog__articles-wrapper" );
  this.articles = element.querySelectorAll( ".blog__article" );
  this.overlay = document.querySelector( ".blog-overlay" );
  this.overlayCloseBtn = this.overlay.querySelector( ".blog-overlay__close-btn" );
  
  this.activeArticle = null;
  
  this.showOverlay = this.showOverlay.bind( this );
  this.clickHandler = this.clickHandler.bind( this );
}
  
  
Blog.prototype.init = function(){
  for( var i = 0; i < this.articles.length; i++ ) {
    new BlogArticle( this.articles[i] );
  }
  window.addEventListener( "showed", this.showOverlay );
  this.overlayCloseBtn.addEventListener( "click", this.clickHandler );
}

Blog.prototype.showOverlay = function( event ) {
  this.overlay.classList.add( "blog-overlay--showed" );
}

Blog.prototype.clickHandler = function( event ) {
  this.hideOverlay();
  this.activeArticle.hide();
}

Blog.prototype.hideOverlay = function() {
  this.overlay.classList.remove( "blog-overlay--showed" );
}

window.Blog = Blog;
  
})()
