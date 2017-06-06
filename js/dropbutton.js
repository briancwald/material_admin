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
        var $dropbutton = $(this).siblings('.dropdown-button');
        if ($dropbutton.length === 0) {
          $dropbutton = $('<a class="dropdown-button btn grey lighten-3 grey-text text-darken-2" href="#">' + Drupal.t('MANAGE') + '</a>');
          $(this).before($dropbutton);
        }
        $dropbutton.attr('data-activates', $(this).attr('id'));

        if (!$(this).hasClass('dropdown-content')) {
          $(this).addClass('dropdown-content');
        }

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
