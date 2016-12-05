/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {


  // Make breadcrumbs more useful by adding the current page
  $(document).ready(function () {
    var title = $('.page-title').text();
    $('.breadcrumb-nav ol').append('<li><span>' + title + '</span></li>');

  });
  $(document).ready(function () {
    // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
    $.each($(':checkbox'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label); });
     $.each($('select'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label); });
  });

  $(document).ready(function () {
    $('select').material_select();
    $('.messages').each(function() {
  Materialize.toast(this, 5000);
})
  });

  $(document).ready(function () {
   $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 200, // Transition in duration
      out_duration: 200, // Transition out duration
      starting_top: '4%', // Starting top style attribute
      ending_top: '10%', // Ending top style attribute
      // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      // complete: function() { alert('Closed'); } // Callback for Modal close
    }
  );
      

  });

})(jQuery, Drupal);
