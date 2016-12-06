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
      $(this).insertBefore(label);
    });
    $.each($('select'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label);
    });
  });

  $(document).ready(function () {
    $('select').material_select();
    var messageCount = $('.messages').length;
    $('.message-trigger').prepend('<span class="badge new red">' + messageCount + '</span>')
    $('.messages--status').each(function () {
      $(this).clone().addClass("message-status-clone").appendTo('#messageContainer .region-status');
      Materialize.toast(this, 5000)
    })
  });

  $(document).ready(function () {
    $('.modal').modal({
      dismissible: true,
      opacity: .5,
      in_duration: 200,
      out_duration: 200,
      // ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
      //   alert("Ready");
      //   console.log(modal, trigger);
      // },
      // complete: function() { alert('Closed'); } // Callback for Modal close
    });

  });

})(jQuery, Drupal);
