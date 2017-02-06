/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {

  $(document).ready(function () {
    // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
    $.each($(':checkbox:not(.item-switch), select'), function (k, v) {
      var label = $('label[for="' + this.id + '"]');
      $(this).insertBefore(label);
    });
  });

  //trigger select boxes to be replaced with li for better styling
  $(document).ready(function () {
    $('select').material_select();
  });

  Drupal.behaviors.material_tooltip = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $('.tooltipped', context).tooltip({ delay: 150 });
      })
    }
  }
  Drupal.behaviors.material_textfields = {
    attach: function (context, settings) {
      $(document).ready(function () {
        Materialize.updateTextFields();
      });
    }
  }

  //without a module, I dont have a method to get the current page title on certain non-node pages, this is a temp workaround.
  // @ToDO Titles in core need to be better descriptive of the actual page.
  $(document).ready(function () {
    var url = window.location.href;
    //remove paramaters from the URL (like ?destination=) to avoid a misleading breadcrumb
   if (url.indexOf("?") >= 0) {
      url = url.substring(0, url.indexOf('?'));
   }
    var currentPageBeadcrumb = $('.breadcrumb-nav li.current span');
    var currentPageUrlSegment = url.substr(url.lastIndexOf('/') + 1);
    var urlSegmentAsTitle = currentPageUrlSegment.replace(/[_-]/g, " ");
    // In some administartion pages, the title is the same for multiple pages (I.E. content-types management)
    // This is not very helpful, so get see if that last 2 items match and replace it with last URL semgent for better wayfinding.
    var lastLinkItem = $('.breadcrumb-nav li:nth-last-of-type(2)').text();
    if (currentPageBeadcrumb.is(':empty') || (currentPageBeadcrumb.text() === lastLinkItem)) {
      currentPageBeadcrumb.text(urlSegmentAsTitle).addClass('url-segement-title');
    }
  });

  //trigger modals
  $(document).ready(function () {
    $('.modal').modal({
      dismissible: true,
      opacity: 0.5,
      in_duration: 200,
      out_duration: 200,
    });
  });

})(jQuery, Drupal);
