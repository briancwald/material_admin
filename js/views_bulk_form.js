/**
 * @file
 * Contains special styling for the Views bulk form.
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.materialAdminBulkForm = {
    attach: function (context, settings) {
      $('.views-bulk-form-dropdown li a', context).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var action = $(this).prop('hash');
        $(this).closest('.views-bulk-form-header').find('select').val(action);
        $(this).closest('.views-bulk-form-header').find('input[type="submit"]').trigger('click');
      });
    }
  };

}(jQuery, Drupal));
