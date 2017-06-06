/**
 * @file
 * Dropbutton override
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.material_dropbutton = {
    attach: function (context, settings) {
      $('ul.dropbutton', context).each(function () {
        $(this).uniqueId();
        $(this).siblings('.dropdown-button').attr('data-activates', $(this).attr('id'));

        var buttonWidth =  $(this).outerWidth();
        $(this).find('.dropdown-content li').css('min-width', buttonWidth);

        $(this).dropdown({
          inDuration: 300,
          outDuration: 225,
          gutter: 0,
          constrainWidth: false,
          belowOrigin: false,
          alignment: 'left',
          stopPropagation: false
        });
      });
    }
  };

}(jQuery, Drupal));
