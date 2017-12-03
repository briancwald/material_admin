/**
 * @file
 * Contains special styling for the Views bulk form.
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.materialAdminBulkForm = {
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
          var label = $label.length === 1 ?$label.text() : $(this).attr('name');
          var $chip = $('<div class="chip"></div>');
          $chip.text(label + ': ' + value);
          $chips.append($chip);
        }
      });
      $($chips.children().get().reverse()).each(function (index) {
        $(this).fadeTo(0, 0).delay(250 + (250 * index)).fadeTo(500, 1);
      });
      $('.views-bulk-form-dropdown').closest('form').on('change', function () {
        var count = $(this).find('input[name*="bulk_form"][type="checkbox"]:checked').length;
        $(this).closest('.view').toggleClass('has-selection', !!count);
        if (count >= 1) {
          var text = Drupal.formatPlural(count, '@count item selected', '@count items selected');
          $(this).find('.views-bulk-form-count').html('<p>' + text + '</p>');
          $exposed.collapsible('close', 0);
        }
      });
      $('.views-bulk-form-dropdown li a', context).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var action = $(this).prop('hash');
        action = action.substr(1, action.length);
        $(this).closest('.views-bulk-form-header').find('select').val(action);
        $(this).closest('.views-bulk-form-header').find('input[type="submit"]').trigger('click');
      });
    }
  };

}(jQuery, Drupal));
