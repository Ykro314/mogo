(function(){
  
"use strict";
  
function Blog( element ){
  this.element = element;
  this.articlesWrapper = element.querySelector( ".blog__articles-wrapper" );
  this.articles = element.querySelectorAll( ".blog__article" );
  this.blogData = blogArticles;
  
  this.overlay = document.querySelector( ".blog-overlay" );
  this.overlayCloseBtn = this.overlay.querySelector( ".blog-overlay__close-btn" );
  this.overlayAnimateContent = this.overlay.querySelectorAll( ".blog-overlay [data-animate]" );
  
  this.activeArticle = null;
  
  this.showOverlay = this.showOverlay.bind( this );
  this.clickHandler = this.clickHandler.bind( this );
  
  this.animateContent = this.animateContent.bind( this );
}
  
  
Blog.prototype.init = function(){
  for( var i = 0; i < this.articles.length; i++ ) {
    new BlogArticle( this.articles[i], this.blogData[i] );
  }
  window.addEventListener( "showed", this.showOverlay );
  this.overlayCloseBtn.addEventListener( "click", this.clickHandler );
}

Blog.prototype.showOverlay = function( event ) {
  
  this.overlay.classList.add( "blog-overlay--showed" );
  document.body.classList.add( "body-noscroll" );
  setTimeout( this.animateContent, 300 );
}

Blog.prototype.clickHandler = function( event ) {
  this.hideOverlay();
  this.activeArticle.hide();
}

Blog.prototype.hideOverlay = function() {
  this.overlay.classList.remove( "blog-overlay--showed" );
  document.body.classList.remove( "body-noscroll" );
  setTimeout( this.animateContent, 300 );
}

Blog.prototype.animateContent = function() {
  Array.prototype.forEach.call( this.overlayAnimateContent, function( el ) {
    el.classList.toggle( "blog-animate" );
  })
}

Blog.prototype.renderOverlay = function() {
  
}

window.Blog = Blog;
  
})()
