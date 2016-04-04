var menuElement = document.querySelector( ".navigation__list" );
var menuItems = document.querySelectorAll( ".navigation__item" );
var underline = document.querySelector( ".navigation__line" );

menuElement.addEventListener( "mouseover", function( event ){
  if( event.target.tagName.toLowerCase() === "a" ){
    var itemCoords = event.target.getBoundingClientRect();
    var menuCoords = menuElement.getBoundingClientRect();

    underline.style.width = itemCoords.width - 20 + "px";
    underline.style.transform = "translate(" + (itemCoords.left - menuCoords.left + 60) + "px)";
  }
})

menuElement.addEventListener( "mouseout", function( event ) {
  if( event.relatedTarget.classList.contains( "inner" ) ) {
    underline.style.transform = "";
    underline.style.width = "";
  }
})