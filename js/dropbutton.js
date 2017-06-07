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
          var btn_classes;
          if ($(this).closest('.views-ui-display-tab-actions').length) {
            btn_classes = 'dropdown-button btn btn-flat darken-3 text-darken-2';
          }
          else {
            btn_classes = 'dropdown-button btn grey lighten-3 grey-text text-darken-2';
          }
          $dropbutton = $('<a class="' + btn_classes + '" href="#" data-constrainWidth="0">' + Drupal.t('MANAGE') + '</a>');
          $(this).before($dropbutton);
        }
        $dropbutton.attr('data-activates', $(this).attr('id'));

        if (!$(this).hasClass('dropdown-content')) {
          $(this).addClass('dropdown-content');
        }

        $(this).find('li').css('min-width', $dropbutton.outerWidth());

        $dropbutton.dropdown({
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
