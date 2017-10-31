/**
 * @file
 * Dropbutton override
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.dropButton = {
    attach: function (context) {
      $('ul.dropbutton', context).each(function () {
        $(this).uniqueId();
        var $dropbutton = $(this).siblings('.dropdown-button');
        if ($dropbutton.length === 0) {
          var btnClasses;
          if ($(this).closest('.views-ui-display-tab-actions').length) {
            btnClasses = 'dropdown-button btn-flat darken-3 text-darken-2';
          } else {
            btnClasses = 'dropdown-button ellipsis-icon btn grey lighten-3 grey-text text-darken-2';
          }
          $dropbutton = $('<a class="' + btnClasses + '" href="#" data-constrainWidth="0"><i class="material-icons" aria-hidden="true">content_copy</i></a>');
          $(this).before($dropbutton);
        }

        if ($dropbutton.closest('.webform-dropbutton').find('li.submissions').length) {
          $dropbutton.children('.material-icons').text('move_to_inbox');
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
