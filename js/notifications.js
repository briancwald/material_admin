/**
 * @file
 * Notification system
 *
 */



(function ($, Drupal) {

Drupal.behaviors.dfs_admin = {
    attach: function (context, settings) {
        $('.messages').once('dfs_admin').each(function()  {
              Materialize.toast($('.messages'), 5000, '', function () { messageInbox(); });
        });
    }
};

  //clone those and put them in the message center
  function messageInbox() {
    $('.messages').once('dfs_admin_inbox').each(function () {
      $(this).clone().appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone');
    });
    messageCounter();
  }

  function messageCounter() {
    var messageBadge = $('.message-trigger .badge').length;
    var messageCount = $('.region-status .messages-clone').length;
    if (messageCount >= 1 && messageBadge) {
      $('.message-trigger span.badge').text(messageCount);
    }
    if (messageCount >= 1 && !messageBadge) {
      $('.message-trigger').append('<span class="badge new red">' + messageCount + '</span>');
    }
  }



})(jQuery, Drupal);
