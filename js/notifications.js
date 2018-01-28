/**
 * @file
 * Notification system
 *
 */

(function ($, Drupal, Materialize) {

  // Max message length to show in the notification prompt
  // @ToDo make this default configurable in theme settings

  Drupal.behaviors.material_notification = {
    attach: function (context, settings) {
      if ($.isNumeric(drupalSettings.material_admin.material_admin_message_length)) {
      var maxMessageLength = drupalSettings.material_admin.material_admin_message_length;
      } else {
        maxMessageLength = Infinity;
      }

      var messages = $('div.messages');
      messages.once('material_notification').each(function () {
        var messageMax = maxMessageLength;
        var messageContent = $(this).find('.message-content');

        messageContent.each(function () {
          var statusType = '';
          var statusText = '';
          if ($(this).closest($('.messages')).hasClass('messages--status')) {
            statusType = 'messages--status';
            statusText = ' Status ';
          }
          if ($(this).closest($('.messages')).hasClass('messages--warning')) {
            statusType = 'messages--warning';
            statusText = ' Warning ';
          }
          if ($(this).closest($('.messages')).hasClass('messages--error')) {
            statusType = 'messages--error';
            statusText = ' Error ';
          }
          var thisMessageSize = messageContent.text().length;

          // Check to see if the message is too long for reasonable reading inside a toast notification
          if (thisMessageSize <= messageMax) {
            var thisItem = $(this).closest($('.messages'));
            var itemContent = $(this).text();
            Materialize.toast(itemContent, 5000, statusType);
            messageInbox(statusType, thisItem);
          }
          if (thisMessageSize >= messageMax) {
            // If the notification is too long, provide a notice to view in an easier to read format
            thisItem = $(this).closest($('.messages'));
            var messageTrigger = '<a class="modal-trigger message-action" href="#messageContainer">View</a>';
            var messageNotice = 'There is a' + statusText + 'message in your notification console ' + messageTrigger + '';
            messageInbox(statusType, thisItem);
            // only display if message prompt setting is 0.
            if (drupalSettings.material_admin.material_admin_message_prompt) {
             Materialize.toast(messageNotice, 5000, statusType);
           }
          }
        });
      });
    }
  };
  //Since Toast removes the item after the notice, clone it put them in the message container
  function messageInbox(statusType, thisItem) {
    thisItem.each(function () {
      $(this).appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone').show();
      messageCounter(thisItem, statusType);

    });
  }
  //add badge for each message type
  function messageCounter(itemforMessageCenter, statusType) {
    var currentValue = parseInt($('.message-trigger span.badge.' + statusType).text(), 10);
    var messageCount = currentValue + 1;
    $('.message-trigger span.badge.' + statusType).text(messageCount).show();
    if (messageCount >= 1) {
      $('#notification-wrapper').show();
    }
  }

}(jQuery, Drupal, Materialize));
