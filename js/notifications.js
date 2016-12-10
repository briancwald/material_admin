/**
 * @file
 * Notification system
 *
 */



(function ($, Drupal) {


  // Max message length to show in the notification prompt
  // @ToDo make this default configurable in theme settings
  var maxMessageLength = "70";

  Drupal.behaviors.dfs_admin = {
    attach: function (context, settings) {
      var messages = $('.messages');
      messages.once('dfs_admin').each(function (messageMax) {
        messageMax = maxMessageLength;
        var messageContent = $('.message-content', this);
        var thisMessageSize = messageContent.text().length;

        if ($(this).hasClass('messages--status')) {
          statusType = 'messages--status';
          statusText = ' Status ';
        }
        if ($(this).hasClass('messages--warning')) {
          statusType = 'messages--warning';
          statusText = ' Warning ';
        }
        if ($(this).hasClass('messages--error')) {
          statusType = 'messages--error';
          statusText = ' Error ';
        }

        // Check to see if the message is too long for reasonable reading inside a toast notification
        if (thisMessageSize <= messageMax) {
          thisItem = $(this);
          Materialize.toast(messages, 5000, statusType, function () { messageInbox(statusType, thisItem); });
        } else {
          // If the notification is too long, provide a notice to view in an easier to read format
          thisItem = $(this);
          var messageNotice = 'There is a' + statusText + 'message in your notification console';
          messages.hide();
          Materialize.toast(messageNotice, 5000, statusType, function () { messageInbox(statusType, thisItem); });
        }
      });
    }
  };

  //Since Toast removes the item after the notice, clone it put them in the message container
  function messageInbox(statusType, thisItem) {
    console.log(thisItem);
    thisItem.each(function () {
      $(this).clone().appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone').show();
      itemClone = $(this);
      messageCounter(itemClone, statusType);

    });
  }

  //add badge for each message type
  function messageCounter(itemClone, statusType) {
    messageCount = 0;
    var currentValue = parseInt($('.message-trigger span.badge.' + statusType).text(), 10);
    messageCount = currentValue + 1;
    $('.message-trigger span.badge.' + statusType).text(messageCount).show();
  }

})(jQuery, Drupal);
