/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {

  $(document).ready(function () {
    // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
    $.each($(':checkbox:not(.item-switch), select'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label);
    });
  });

  //trigger select boxes to be replaced with li for better styling

  $(document).ready(function () {
    $('select').material_select();
  });


  Drupal.behaviors.material_tooltip = {
    attach: function (context, settings) {
      $('.tooltipped').once('material_tooltip').tooltip({ delay: 150 });
    }
  };


//without a module, I dont have a method to get the current page title on certain non-node pages, this is a temp workaround
$(document).ready(function() {
  var url = window.location.href;  
  var currentPageBeadcrumb = $('.breadcrumb-nav li.current span');
  var currentPageUrlSegment = url.substr(url.lastIndexOf('/') + 1);
  var urlSegmentAsTitle = currentPageUrlSegment.replace(/[_-]/g, " ");
  if (currentPageBeadcrumb.is(':empty')) {
   currentPageBeadcrumb.text(urlSegmentAsTitle).addClass('url-segement-title');
  }
});

  //trigger modals
  $(document).ready(function () {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      in_duration: 200,
      out_duration: 200,
    });

  });

})(jQuery, Drupal);
