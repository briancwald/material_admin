/**
 * @file
 * Contains special styling for the Views bulk form.
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.materialAdminBulkForm = {
    attach: function (context, settings) {
      var $exposed = $('.exposed-form-collapsible');
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
