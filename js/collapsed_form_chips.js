/**
 * @file
 * Contains special styling for the collapsed form container.
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.materialAdminCollapsedFormChips = {
    attach: function (context, settings) {
      var $exposed = $('.exposed-form-collapsible');
      $exposed.collapsible();
      var $chips = $exposed.find('.exposed-form-chips');
      $chips.empty();
      $exposed.find('input[name]:not([type="submit"]),select[name]').each(function () {
        var value;
        if (this.tagName === 'SELECT') {
          value = $(this).find('option:selected').map(function () {
            return $(this).text();
            }).get().join(', ');
        }
        else {
          value = $(this).val();
        }
        if (value.length) {
          var $label = $(this).closest('.form-item').find('label');
          var label = $label.length === 1 ?$label.text() : $(this).attr('name').replace('[]','');
          var $chip = $('<div class="chip"></div>');
          $chip.text(label + ': ' + value);
          $chips.append($chip);
        }
      });
      $($chips.children().get().reverse()).each(function (index) {
        $(this).fadeTo(0, 0).delay(250 + (250 * index)).fadeTo(500, 1);
      });
    }
  };

}(jQuery, Drupal));
