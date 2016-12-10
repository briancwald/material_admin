/**
 * @file
 * Notification system
 *
 */



(function ($, Drupal) {


  // Max message length to show in the notification prompt
  // @ToDo make this default configurable in theme settings
  var maxMessageLength = '130';

  Drupal.behaviors.dfs_admin = {
    attach: function (context, settings) {
      var messages = $('div.messages');
      messages.once('dfs_admin').each(function () {
        messageMax = maxMessageLength;
        var messageContent = $('.message-content');
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
          Materialize.toast(thisItem, 5000, statusType);
           messageInbox(statusType, thisItem); 
      }
        if (thisMessageSize >= messageMax){
          // If the notification is too long, provide a notice to view in an easier to read format
          thisItem = $(this);
          var messageTrigger = '<a class="modal-trigger btn-flat" href="#messageContainer">View ' + statusText + '</a>';
          var messageNotice = 'There is a' + statusText + 'message in your notification console ' + messageTrigger + '';
          //Since materialize does not grab the entire dom element here like above
          messages.hide();
          messageInbox(statusType, thisItem); 
          Materialize.toast(messageNotice, 5000, statusType);
        }
      });
    }
  };

  //Since Toast removes the item after the notice, clone it put them in the message container
  function messageInbox(statusType, thisItem) {
    console.log(thisItem);
    thisItem.each(function () {
      $(this).clone().appendTo('#messageContainer .region-status').removeClass('messages').addClass('messages-clone').show();
      itemClone = thisItem;
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
