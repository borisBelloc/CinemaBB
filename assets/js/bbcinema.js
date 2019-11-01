// Navbar shadow on scroll
$(window).scroll(function () {
  if ($(window).scrollTop() > 700) {
    $('.navbar').addClass('floatingNav');
    $('.navbar').removeClass('transparent');
    $('.navbar-nav').removeClass('displayNone');
  } else {
    // $('.navbar').removeClass('floatingNav');
  }
  if ($(window).scrollTop() < 700) {
    $('.navbar').addClass('transparent');
    $('.navbar-nav').addClass('displayNone');
    $('.navbar').removeClass('floatingNav');
  }
});


/* ********************************** */
/* BTN TO TOP */
/* ********************************** */
//Get the button:
mybutton = document.getElementById("btnToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    // BTN after timeline; because JS animation make the button jump @timeline /resolution 1024px->1167px
    // if (document.body.scrollTop > 3800 || document.documentElement.scrollTop > 3800) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}


// Light at mouse 

// var originalBG = '000000',
//   lightColor = 'fff',
//   gradientSize = 2;

// $('body')
//   .mousemove(function (e) {
//     originalBG = $("body").css("background-color");
//     x = e.pageX - this.offsetLeft;
//     y = e.pageY - this.offsetTop;
//     xy = x + " " + y;

//     bgWebKit = "-webkit-gradient(radial, " + xy + ", 0, " + xy + ", 100, from(rgba(255,255,255,0.8)), to(rgba(255,255,255,0.0))), " + originalBG;
//     bgMoz = "-moz-radial-gradient(" + x + "px " + y + "px 45deg, circle, " + lightColor + " 0%, " + originalBG + " " + gradientSize + "px)";

//     $(this)
//       .css({
//         background: bgWebKit
//       })
//       .css({
//         background: bgMoz
//       });

//   }).mouseleave(function () {
//     $(this).css({
//       background: originalBG
//     });
//   });


// PARALAX (Greensock)
$("#cinema").mousemove(function (e) {
  parallaxIt(e, "#slogan", -20);
  parallaxIt(e, "#cinemaPicture", -6);
});

function parallaxIt(e, target, movement) {
  var $this = $("#cinema");
  var relX = e.pageX - $this.offset().left;
  var relY = e.pageY - $this.offset().top;

  TweenMax.to(target, 1, {
    x: (relX - $this.width() / 2) / $this.width() * movement,
    y: (relY - $this.height() / 2) / $this.height() * movement
  });
}