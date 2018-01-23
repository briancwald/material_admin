/**
 * @file
 * Generic functions DF Admin
 *
 */
(function ($, Drupal) {
  Drupal.behaviors.material_checkbox = {
    attach: function (context) {
      // limitation of drupal placing <label> before checkbox, which is bad idea and doesnt work with materialize checkboxes
      $(context).find(':checkbox:not(.item-switch)').once('material_checkbox').each(function () {
        var label = $('label[for="' + this.id + '"]');
        $(this).insertBefore(label);
      });
    }
  };

  Drupal.behaviors.material_radio = {
    attach: function (context) {
      // limitation of drupal placing <label> before radio, if visisually hidden, still show the radio button.
      $(context).find('.form-type-radio input[type=radio]').once('material_radio').each(function () {
        var label = $('label[for="' + this.id + '"]');
        $(this).insertBefore(label);
        if (label.hasClass('visually-hidden')) {
          label.addClass('show-radio-btn')
        }
      });
    }
  };

    Drupal.behaviors.material_multiple_select = {
    attach: function (context) {
      $(context).find('select[multiple]:not(.browser-default)').once('material_multiple_select').each(function () {
        $(this).prepend("<option value='' disabled > - </option>");
      })
     }
  };
  //If form API checkbox or radio has no label, add one so we can use materializecss styling
  Drupal.behaviors.material_checkbox_no_label = {
    attach: function (context) {
      $(context).find('.form-no-label input[type=checkbox]:not(.item-switch), .form-no-label input[type=radio]').once('material_checkbox_no_label').each(function() {
        if(this.nextSibling.nodeName != 'label') {
          $(this).after('<label for="'+this.id+'"></label>')
        }
      })
    }
  };
  //trigger select boxes to be replaced with li for better styling
  // (not intended for cardinality select boxes)
  Drupal.behaviors.material_select_box = {
    attach: function (context) {
      $('select:not(.field-parent)', context).once('material_select_box').each(function () {
        $(this).material_select();
        $(this).parent('.select-wrapper').removeClass(function (index, className) {
          return (className.match(/\S+delta-order/) || []).join(' ');
        });
      });
    }
  };
  // textareas that have initial content need to be auto resized.
  Drupal.behaviors.material_textarea = {
    attach: function (context) {
      $(document).ready(function () {
        var $textWrapper = $('.form-textarea-wrapper textarea');
        $(context).find($textWrapper).once('material_textarea').each(function () {
          $(this).trigger('autoresize');
        })
      })
    }
  };
  Drupal.behaviors.material_tooltip = {
    attach: function (context) {
      var $tooltipped = $('.tooltipped');
      $(context).find($tooltipped).once('material_tooltip').tooltip({ delay: 150, html: true });
      $(document).once('material_tooltip')
        .on('mouseenter', '.material-tooltip', function() {
          $('[data-tooltip-id="' + this.id + '"]').trigger('mouseenter');
        })
        .on('mouseleave', '.material-tooltip', function() {
          $('[data-tooltip-id="' + this.id + '"]').trigger('mouseleave');
        });
    }
  };
  Drupal.behaviors.material_textfields = {
    attach: function (context) {
      $(document).ready(function () {
        //account for field prefix, move the absolute label over to be positioned in the box.
        $(context).find('.input-field').once('material_textfields').each(function () {
          if ($(this).find(' > span.field-prefix').length) {
            $(this).find(' > label').addClass('inline-label');
          }
          Materialize.updateTextFields();
          removeInitialContent(context);
        });
      });
    }
  };

  // remove initial class after materialize updates textfields
  function removeInitialContent(context) {
    var $initialContent = $('.has-initial-content');
     $(context).find($initialContent).removeClass('has-initial-content');
  };
  //without a module, I dont have a method to get the current page title on certain non-node pages, this is a temp workaround.
  // @ToDO Titles in core need to be better descriptive of the actual page.
  Drupal.behaviors.material_breadcrumbs = {
    attach: function () {
      var url = window.location.href;
      //remove paramaters from the URL (like ?destination=) to avoid a misleading breadcrumb
      if (url.indexOf("?") >= 0) {
        url = url.substring(0, url.indexOf('?'));
      }
      if (url.indexOf("#") >= 0) {
        url = url.substring(0, url.indexOf('#'));
      }
      var currentPageBeadcrumb = $('.breadcrumb-nav li span.current');
      var currentPageUrlSegment = url.substr(url.lastIndexOf('/') + 1);
      var urlSegmentAsTitle = currentPageUrlSegment.replace(/[_-]/g, " ");
      // In some administartion pages, the title is the same for multiple pages (I.E. content-types management)
      // This is not very helpful, so get see if that last 2 items match and replace it with last URL semgent for better wayfinding.
      var lastLinkItem = $('.breadcrumb-nav li:nth-last-of-type(2)').text().trim();
      if (currentPageBeadcrumb.is(':empty') || (currentPageBeadcrumb.text() === lastLinkItem)) {
        currentPageBeadcrumb.text(urlSegmentAsTitle).addClass('url-segement-title');
      }
    }
  }
  Drupal.behaviors.material_modal = {
    attach: function (context) {
      var $modal = $('.modal');
      $(context).find($modal).once('material_modal').modal({
        dismissible: true,
        opacity: 0.5,
        in_duration: 200,
        out_duration: 200,
      });
    }
  };
  Drupal.behaviors.material_admin_node_actions = {
    attach: function (context) {
      if (drupalSettings && drupalSettings.material_admin && drupalSettings.material_admin.material_admin_node_actions) {
        var actionsSize = $('.sticky-node-actions').outerHeight();
        $(context).find('body.material_admin').once('material_admin_node_actions').css('padding-bottom', actionsSize);
      }
    }
  };
  Drupal.theme.verticalTab = function (settings) {
    var tab = {};
    tab.item = $('<li class="vertical-tabs__menu-item waves-effect" tabindex="-1"></li>').append(tab.link = $('<a class="vertical-tab-link" href="#"></a>').append(tab.title = $('<strong class="vertical-tabs__menu-item-title"></strong>').text(settings.title)).append(tab.summary = $('<span class="vertical-tabs__menu-item-summary"></span>')));
    return tab;
  };

  Drupal.behaviors.material_admin_resize_textfield = {
    attach: function () {
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
          $addDisplayDropdown.addClass('dropdown-button');
        }
      });
    }
  };
 
  //jqueryUI dialog enhancments: disallow background page scroll when modal is open. allow clicking away from dialog to close modal.
  Drupal.behaviors.material_admin_jqueryui_dialog_enhancements = {
    attach: function (settings) {
      //if the checkbox is checked in the theme settings UI.
      if (drupalSettings.material_admin && (drupalSettings.material_admin.material_admin_jqueryui_dialog_close || drupalSettings.material_admin.material_admin_jqueryui_dialog_background)) {
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
  };

  var ckeditor_wait = setInterval(function () {
    if (typeof CKEDITOR !== 'undefined') {
      clearInterval(ckeditor_wait);
      for (var i in CKEDITOR.instances) {
        CKEDITOR.instances[i].on('dialogShow', function (e) {
          var element = e.data.parts.dialog.$;
          element.parentElement.classList.remove('cke_reset_all');
          element.style.width = 'auto';
          var cancel = element.querySelector('.cke_dialog_ui_button_cancel');
          var ok = element.querySelector('.cke_dialog_ui_button_ok');
          if (cancel) {
            cancel.classList.remove('cke_dialog_ui_button_cancel', 'cke_dialog_ui_button');
            cancel.classList.add('btn', 'btn-flat', 'darken-3', 'text-darken-2');
          }
          if (ok) {
            ok.classList.remove('cke_dialog_ui_button_ok', 'cke_dialog_ui_button');
            ok.classList.add('btn', 'btn-flat', 'darken-3', 'text-darken-2');
          }
          Drupal.attachBehaviors(element);
        });
      }
    }
  }, 100);
}(jQuery, Drupal));
