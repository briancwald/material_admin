<?php

/**
 * @file
 * Add custom theme settings to Material Admin.
 */

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * @param $form
 *   The form.
 * @param $form_state
 *   The form state.
 */
function material_admin_form_system_theme_settings_alter(&$form, $form_state) {
  $form['theme_ui_options'] = array(
    '#type' => 'details',
    '#title' => t('Material Admin UI Options'),
    '#weight' => -1,
    '#open' => 'true',
  );

  $form['theme_ui_options']['material_admin_node_actions'] = array(
    '#type' => 'checkbox',
    '#title' => t('Display node actions as sticky element'),
    '#description' => t('fix the node action buttons to window bottom'),
    '#default_value' => theme_get_setting('material_admin_node_actions'),
  );

  $form['theme_ui_options']['material_admin_portal_login'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use portal style for user login page'),
    '#description' => t('Provides a portal style login, It is recommended you install https://drupal.org/project/admin_login_path so your login pages will use the administration theme. Otherwise this will not have an effect unless you are use material admin as your default theme.'),
    '#default_value' => theme_get_setting('material_admin_portal_login'),
  );

    $form['theme_ui_options']['material_admin_jqueryui_dialog_background'] = array(
    '#type' => 'checkbox',
    '#title' => t('Disable background scroll when dialog is open'),
    '#description' => t('A dialog that scrolls behind the modal causes a bad experience when you are trying to scroll the dialog.'),
    '#default_value' => theme_get_setting('material_admin_jqueryui_dialog_background'),
  );

   $form['theme_ui_options']['material_admin_jqueryui_dialog_close'] = array(
    '#type' => 'checkbox',
    '#title' => t('Close the dialog when clicking outside modal.'),
    '#description' => t('The dialog spec in Material Admin allows you to close the dialog by clicking anywhere outside it.'),
    '#default_value' => theme_get_setting('material_admin_jqueryui_dialog_close'),
  );

    $form['theme_ui_options']['material_admin_collapse_module_list'] = array(
    '#type' => 'checkbox',
    '#title' => t('Collapse the package group on the module extend page'),
    '#description' => t('The module page is visually hard to handle on most sites, this reduces the clutter while still allowing the search to work.'),
    '#default_value' => theme_get_setting('material_admin_collapse_module_list'),
  );

 $form['theme_ui_options']['material_admin_message'] = array(
    '#type' => 'details',
    '#title' => t('Message Options'),
    '#weight' => 1,
    '#open' => 'true',
  );

  $form['theme_ui_options']['material_admin_message']['material_admin_message_length'] = array(
    '#type' => 'number',
    '#title' => t('Max allowed characters of status messages in notification'),
    '#description' => t('limits the characters shown in the <a href="https://material.io/guidelines/components/snackbars-toasts.html" target="_blank">Toast </a> status message to avoid distracting long notifications. Notes: the full message will always appear in the bottom drawer. leave blank for infinite.'),
    '#default_value' => theme_get_setting('material_admin_message_length'),
  );
    $form['theme_ui_options']['material_admin_message']['material_admin_message_prompt'] = array(
    '#type' => 'checkbox',
    '#title' => t('Skip toast notice entirely if the message is too long'),
    '#description' => t('If checked, a long message will skip the toast notice and only show up in the bottom drawer'),
    '#default_value' => theme_get_setting('material_admin_message_prompt'),
  );

  $form['theme_ui_options']['material_admin_datepicker_select_years'] = array(
    '#type' => 'number',
    '#title' => t('Number of years in datepicker'),
    '#description' => t('Defines the number of years, that will be available in the datepicker dropdown.'),
    '#default_value' => theme_get_setting('material_admin_datepicker_select_years'),
  );

   $form['theme_ui_options']['material_admin_compatability'] = array(
    '#type' => 'details',
    '#title' => t('Compatability Mode'),
    '#weight' => 1,
    '#open' => 'true',
  );

  $form['theme_ui_options']['material_admin_compatability']['material_admin_select_default'] = array(
    '#type' => 'checkbox',
    '#title' => t('Use browser defaults for select elements (do not replace with materializecss styles)'),
    '#description' => t('Turning this on will use browser defaults for the select elements, this is for compatability with modules that replace select elements, such as Chosen.'),
    '#default_value' => theme_get_setting('material_admin_select_default'),
  );
}
