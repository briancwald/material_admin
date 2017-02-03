/**
 * @file
 * Dropbutton override
 *
 */



(function ($, Drupal) {

$(document).ready(function(){
  //create a random id so that we can multiple dropdowns on the same page
  function uniqueID() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(5).substring(1);
    };
    return ('dropbutton-' + S4());
  }

    $('ul.dropbutton').each(function( index ) {
      var unique = uniqueID();
      $(this).attr('id', unique);
     //$(this).before('<a class="dropdown-button btn" href="#" data-activates="' + unique + '" ">Manage</a>')
     $(this).siblings('.dropdown-button').attr('data-activates',unique);
    });

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left', // Displays dropdown with edge aligned to the left of button
      stopPropagation: false // Stops event propagation
    }
  );
});

})(jQuery, Drupal);
