/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {

  Drupal.behaviors.material_checkbox = {
    attach: function (context) {
      // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
      $(context).find(':checkbox:not(.item-switch), select').once('material_checkbox').each(function (k, v) {
        var label = $('label[for="' + this.id + '"]');
        $(this).insertBefore(label);
      });
    }
  };
  
  //trigger select boxes to be replaced with li for better styling
  // (not intended for cardinality select boxes)
  Drupal.behaviors.material_select_box = {
    attach: function (context) {
      $(context).find('select').once('material_select_box').material_select();
    }
  };

  Drupal.behaviors.material_tooltip = {
    attach: function (context) {
      $(context).find('.tooltipped').once('material_tooltip').tooltip({ delay: 150 });
    }
  };

  Drupal.behaviors.material_textfields = {
    attach: function (context, settings) {
      $(document).ready(function () {
        //account for field prefix, move the absolute label over to be positioned in the box.
        $(context).find('.input-field').once('material_textfields').each(function () {
          if ($(this).find(' > span.field-prefix').length) {
            var prefixWidth = $(this).find(' > span.field-prefix').outerWidth();
            $(this).find(' > label').css('left', prefixWidth + 10);
          }
          Materialize.updateTextFields();
        });
      });
    }
  };

  //without a module, I dont have a method to get the current page title on certain non-node pages, this is a temp workaround.
  // @ToDO Titles in core need to be better descriptive of the actual page.
  $(document).ready(function () {
    var url = window.location.href;
    //remove paramaters from the URL (like ?destination=) to avoid a misleading breadcrumb
    if (url.indexOf("?") >= 0) {
      url = url.substring(0, url.indexOf('?'));
    }
    if (url.indexOf("#") >= 0) {
      url = url.substring(0, url.indexOf('#'));
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

  Drupal.behaviors.material_modal = {
    attach: function (context, settings) {
      $(context).find('.modal').once('material_modal').modal({
        dismissible: true,
        opacity: 0.5,
        in_duration: 200,
        out_duration: 200,
      });
    }
  };

  Drupal.behaviors.material_admin_node_actions = {
    attach: function (context, settings) {
      if (drupalSettings && drupalSettings.material_admin && drupalSettings.material_admin.material_admin_node_actions) {
        var actionsSize = $('.sticky-node-actions').outerHeight();
        $(context).find('body.material_admin').once('material_admin_node_actions').css('padding-bottom', actionsSize);
      }
    }
  };

  Drupal.theme.verticalTab = function (settings) {
    var tab = {};
    tab.item = $('<li class="vertical-tabs__menu-item waves-effect" tabindex="-1"></li>')
      .append(tab.link = $('<a class="vertical-tab-link" href="#"></a>')
        .append(tab.title = $('<strong class="vertical-tabs__menu-item-title"></strong>').text(settings.title))
        .append(tab.summary = $('<span class="vertical-tabs__menu-item-summary"></span>'))
      );
    return tab;
  };


  Drupal.behaviors.material_admin_resize_textfield = {
    attach: function (context, settings) {
      // resize the textfiled if the value is longer than the default value
      function resizeInput() {
        var textSize = $(this).attr('size');
        if (textSize < $(this).val().length) {
          $(this).attr('size', $(this).val().length);
        }
      }
      $('input[type="text"]')
        // event handler for typing beyond length
        .keyup(resizeInput)
        // resize on page load
        .each(resizeInput);
    }
  };

  Drupal.behaviors.material_admin_remove_initial_content = {
    attach: function (context, settings) {
      $('.has-initial-content', context).removeClass('has-initial-content');
    }
  };

  Drupal.behaviors.material_admin_views_ui_add_button = {
    attach: function (context) {
      setTimeout(function () {
        // Build the add display menu and pull the display input buttons into it.
        var $menu = $(context).find('#views-display-menu-tabs').once('material-admin-views-ui-render-add-view-button');
        if (!$menu.length) {
          return;
        }

        var $addDisplayDropdown = $menu.find('li.add > a');
        if ($addDisplayDropdown.length) {
          $addDisplayDropdown.addClass('dropdown-button btn btn-flat darken-3 text-darken-2');
        }
      });
    }
  };

// For the places that have anchor jump links, provide smooth scrolling
    Drupal.behaviors.material_admin_smooth_anchor_scroll = {
    attach: function (context) {
      $('a[href*="#"]')
        .not('a.vertical-tab-link')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
          if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
          ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
              event.preventDefault();
              $('html, body').animate({
                scrollTop: target.offset().top
              }, 1000, function () {
                // Callback after animation
                // Must change focus!
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                  return false;
                } else {
                  $target.attr('tabindex', '-1');
                  $target.focus();
                };
              });
            }
          }
        });
    }
  };
 //jqueryUI dialog enhancments: disallow background page scroll when modal is open. allow clicking away from dialog to close modal.
 Drupal.behaviors.material_admin_jqueryui_dialog_enhancements = {
   attach: function (context, settings) {
     //if the checkbox is checked in the theme settings UI.
     if (drupalSettings.material_admin.material_admin_jqueryui_dialog_close || drupalSettings.material_admin.material_admin_jqueryui_dialog_background) {
       $(document).ready(function () {
         $(window).on({
           'dialog:aftercreate': function (event, dialog, $modal, settings) {
             if (drupalSettings.material_admin.material_admin_jqueryui_dialog_close) {
               $("body").on('click', '.ui-widget-overlay', function () {
                 if ($("div.ui-dialog").is(":visible")) {
                   var openDialogId = $(".ui-dialog").find(".ui-dialog-content:visible").attr("id");
                   if ($("#" + openDialogId).dialog("isOpen")) {
                     $("#" + openDialogId).dialog('close');
                   }
                 }
               });
             }
             if (drupalSettings.material_admin.material_admin_jqueryui_dialog_background) {
               $('body').css('overflow', 'hidden');
               $modal.dialog({
                 close: function () {
                   $('body').css('overflow', 'auto');
                 }
               });
             }
           }
         });
       });
     }
   }
 }



}(jQuery, Drupal));
