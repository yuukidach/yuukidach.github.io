(function($) { 
	// When to show the scroll link
	// higher number = scroll link appears further down the page   
	var upperLimit = 1000;
	
	// Our scroll link element
	var scrollupElem = $('#totop');
  var scrolldownElem = $('#tobottom');
   
	// Scroll to top speed
	var scrollSpeed = 500;
   
	// Show and hide the scroll to top link based on scroll position   
	scrollupElem.hide();
  scrolldownElem.hide();
  $(window).scroll(function () {            
    var scrollTop = $(document).scrollTop();       
    if ( scrollTop > upperLimit ) {
      $(scrollupElem).stop().fadeIn(300); // fade back in 
      $(scrolldownElem).stop().fadeIn(300);
    }else{
      // fade out
      $(scrollupElem).stop().fadeOut(300, function(){
        scrollupElem.hide();	// hide the element when fade out complete
      });
      $(scrolldownElem).stop().fadeOut(300, function(){
        scrolldownElem.hide();
      });
    }
  });

	// Scroll to top animation on click
	$(scrollupElem).click(function(){
		$('html, body').animate({scrollTop:0}, scrollSpeed); return false;
	});

  $(scrolldownElem).click(function(){
    $('html, body').animate({scrollTop:$(document).height()}, scrollSpeed); return false;
  });

})(jQuery);
