/**
 * @file
 * Color initiate
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.material_color = {
    attach: function (context) {
      $(document).ready(function () {
        $('.color-placeholder').each(function () {
          var $this = $(this);
          $this.wrap('<div class="wrap-placeholder-fab hide-on-small-only"></div>');
          var $target = $('.color-palette');
          var $navOffset = $('#toolbar-bar:visible').outerHeight() + $('#toolbar-item-administration-tray:visible').outerHeight() + $(this).outerHeight() - 10;
          $this.pushpin({
            offset: $navOffset,
            top: $target.offset().top,
            bottom: $target.offset().top + $target.outerHeight() - $this.outerHeight()
          });
        });
      });
    }
  };

}(jQuery, Drupal));
