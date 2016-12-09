/**
 * @file
 * Notification system
 *
 */



(function ($, Drupal) {

  Drupal.behaviors.dfs_admin = {
    attach: function (context, settings) {
      $('.messages').once('dfs_admin').each(function () {
        Materialize.toast($('.messages'), 5000, '', function () { messageInbox(); });
      });
    }
  };


  //clone those and put them in the message center
  function messageInbox() {
    $('.messages').once('dfs_admin_inbox').each(function () {
      $(this).clone().appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone');
      item = $(this);
      messageCounter(item);

    });
  }


  function messageCounter(cloneItem) {
    cloneItem = item;
    var statusType = "";
    messageCount = 0;

    if ($(item).hasClass('messages--status')) {
      statusType = 'status';
    }
    if ($(item).hasClass('messages--warning')) {
      statusType = 'warning';
    }
    if ($(item).hasClass('messages--error')) {
      statusType = 'error';
    }
    var currentValue = parseInt($('.message-trigger span.badge.' + statusType).text(), 10);
    messageCount = currentValue + 1;
    $('.message-trigger span.badge.' + statusType).text(messageCount).show();
  }



})(jQuery, Drupal);
