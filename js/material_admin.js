/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {

  $(document).ready(function () {
    // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
    $.each($(':checkbox:not(.item-switch)'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label);
    });
    $.each($('select'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label);
    });
  });

  //trigger select boxes to be replaced with li for better styling
  $(document).ready(function () {
    $('select').material_select();
  });

  //trigger modals
  $(document).ready(function () {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      in_duration: 200,
      out_duration: 200,
      //complete: function () { $('.message-trigger .badge').removeClass('new red'); } // Since they have been read, remove the styling of new
    });

  });

})(jQuery, Drupal);
