<?php

/**
 * @param array &$page
 *   An empty renderable array representing the page.
 *
 * @see hook_page_attachments_alter()
 */

/**
 * Implements hook_preprocess_page_attachments_alter() for HTML document
 * templates.
 */
function material_admin_page_attachments_alter(&$page) {
  $page['#attached']['drupalSettings']['material_admin']['material_admin_message_length'] = theme_get_setting('material_admin_message_length');
  $page['#attached']['drupalSettings']['material_admin']['material_admin_jqueryui_dialog_background'] = theme_get_setting('material_admin_jqueryui_dialog_background');
  $page['#attached']['drupalSettings']['material_admin']['material_admin_jqueryui_dialog_close'] = theme_get_setting('material_admin_jqueryui_dialog_close');
  $page['#attached']['drupalSettings']['material_admin']['material_admin_datepicker_select_years'] = theme_get_setting('material_admin_datepicker_select_years');
}