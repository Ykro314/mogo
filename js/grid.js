/**
 * Created by stas on 18.05.2016.
 */
var el = document.querySelectorAll( ".work__elem" );

for( var i = 0; i < el.length; i++ ) {
  el[i].style.transition = "all 0.3s";
  el[i].style.position = "relative";
  el[i].addEventListener( "click", function( event ) {
    var coords = this.getBoundingClientRect();
    console.log( coords );
    if( this.style.transform ) {
      this.style.transform = "";
      this.style.zIndex = "";
    }
    else {
      this.style.transform = "scale( 1.5 ) translate3d( 100px, 150px, 500px )";
      this.style.zIndex = "20";
    }
} )

}