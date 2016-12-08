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
    $.each($(':checkbox:not(.item-switch)'), function (k, v) {
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
  });

  Drupal.behaviors.dfs_admin = {
    attach: function (context, settings) {
      if ($('.messages').length) {
        $(this).each(function () {
          Materialize.toast($('.messages'), 5000, '', function () { messageInbox(); });
        })
      }
    }
  };

  //clone those and put them in the message center
  function messageInbox() {
    $('.messages').each(function () {
      $(this).clone().appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone');
    });
    messageCounter();
  }

  function messageCounter() {
    var messageBadge = $('.message-trigger .badge').length;
    var messageCount = $('.region-status .messages-clone').length;
    if (messageCount >= 1 && messageBadge) {
      $('.message-trigger span.badge').text(messageCount);
    };
    if (messageCount >= 1 && !messageBadge) {
      $('.message-trigger').append('<span class="badge new red">' + messageCount + '</span>');
    };
  }



  $(document).ready(function () {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      in_duration: 200,
      out_duration: 200,
      complete: function () { $('.message-trigger .badge').removeClass('new red'); } // Since they have been read, remove the styling of new
    });


  });

})(jQuery, Drupal);
