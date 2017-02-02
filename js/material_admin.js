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
  var currentPageBeadcrumb = $('.breadcrumb-nav li.current span');
  var currentPageTitleString = $('h1.page-title');
  if (currentPageBeadcrumb.is(':empty')) {
   currentPageBeadcrumb.text(currentPageTitleString.text());
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
