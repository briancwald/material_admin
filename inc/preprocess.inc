<?php

use Drupal\Core\Render\Element;

/**
 * Preprocess variables for all templates.
 * @param $variables
 */
/**
 * Implements hook_preprocess_html () for HTML document templates.
 *
 * Adds overall theme class to the body.
 */
function material_admin_preprocess_html(&$variables) {
  $route_match = \Drupal::routeMatch()->getRouteName();
  $variables['attributes']['class'][] = 'material_admin';
  $portal_paths = array('user.pass', 'user.login', 'user.register');
  if (in_array($route_match, $portal_paths) && theme_get_setting('material_admin_portal_login')) {
    $variables['attributes']['class'][] = 'material_login';
  }
}

/**
 * Implements hook_preprocess_page().
 */
function material_admin_preprocess_page(&$variables) {
  $variables['has_breadcrumbs'] = FALSE;
  if (!empty($variables['page']['breadcrumb'])) {
    foreach (Element::children($variables['page']['breadcrumb']) as $child) {
      if (isset($variables['page']['breadcrumb'][$child]['#lazy_builder'])) {
        // Check if breadcrumbs are filled out, by rendering them.
        $lazy_builder = $variables['page']['breadcrumb'][$child]['#lazy_builder'];
        $function = array_shift($lazy_builder);
        $args = array_shift($lazy_builder);
        $render = call_user_func_array($function, $args);
        $variables['has_breadcrumbs'] = !empty(trim(strip_tags(Drupal::service('renderer')->render($render))));
      }
    }
  }
  // Check if dblog is on - if so, provide a variable in @notification-drawer.html.twig
  // to conditionally provide a link to dblog overview.
  $moduleHandler = \Drupal::service('module_handler');
  if ($moduleHandler->moduleExists('dblog')){
    $variables['dblog_link'] = TRUE;
  }
}

/**
 * Implements hook_preprocess_breadcrumb().
 *
 * Adds the "title" variable so that the current page can be added as a
 * breadcrumb.
 */
function material_admin_preprocess_breadcrumb(&$variables) {
  $placeholder_title = [
    '#lazy_builder' => [
      '_material_admin_breadcrumb_title_placeholder',
      ['page_title']
    ],
    '#create_placeholder' => TRUE,
  ];
  $variables['breadcrumb'][] = ['text' => $placeholder_title];
}

/**
 * Implements hook_preprocess_menu_link_task() for HTML document templates.
 */
function material_admin_preprocess_menu_local_task(&$variables) {
  //add class active so that the materialize tabs js works
  if (!empty($variables['element']['#active'])) {
    $variables['is_active'] = TRUE;
    $variables['link']['#attributes']['class'] = 'active';
  }

  // set target to self so the links work properly with tabs.js
  $variables['link']['#attributes']['target'] = '_self';
}

/**
 * Implements hook_preprocess_input() for HTML document templates.
 *
 * if there is an empty placeholder, materialize does weird things. ref:
 * github.com/Dogfalo/materialize/pull/1737/files
 */
function material_admin_preprocess_input(&$variables) {
  $element = $variables['element'];
  if (isset($variables['attributes']['placeholder']) && empty(implode($variables['attributes']['placeholder']))) {
     unset($variables['attributes']['placeholder']);
  }
  $variables['children'] = $element['#children'];
}

/**
 * Implements hook_preprocess_node_add_list() for HTML document templates.
 *
 */
function material_admin_preprocess_node_add_list(&$variables) {
  if (!empty($variables['content'])) {
    /** @var \Drupal\node\NodeTypeInterface $type */
    foreach ($variables['content'] as $type) {
      $variables['types'][$type->id()]['label'] = $type->label();
    }
  }
}

/**
 * Implements hook_preprocess_system_modules_details() for HTML document
 * templates.
 *
 * force the checkbox to use a new twig template input--switch so that the
 * markup can be differet.
 */
function material_admin_preprocess_system_modules_details(&$variables) {
  foreach ($variables['modules'] as &$module) {
    $module['checkbox']['#theme'] = 'input__switch__install';
    $module['checkbox']['#attributes']['class'][] = 'item-switch';
  }
}

/**
 * Implements hook_preprocess_system_modules_uninstall() for HTML document
 * templates.
 *
 * force the checkbox to use a new twig template input--switch so that the
 * markup can be differet.
 */
function material_admin_preprocess_system_modules_uninstall(&$variables) {
  foreach ($variables['modules'] as &$module) {
    $module['checkbox']['#theme'] = 'input__switch__uninstall';
    $module['checkbox']['#attributes']['class'][] = 'item-switch';
  }
}

/**
 * Implements hook_preprocess_menu_local_action() for HTML document templates.
 *
 * add classes to action butons to allow for interaction click support
 */
function material_admin_preprocess_menu_local_action(&$variables) {
  $variables['link']['#options']['attributes']['class'] = array_merge($variables['link']['#options']['attributes']['class'], [
    'waves-effect',
    'waves-light'
  ]);
}

/**
 * Implements hook_reprocess_views_ui_display_tab_setting().
 */
function material_admin_preprocess_views_ui_display_tab_setting(&$variables) {
  if (count($variables['settings_links']) === 1 && $variables['settings_links'][0] instanceof \Drupal\Core\GeneratedLink && strpos($variables['settings_links'][0]->getGeneratedLink(), 'display_title"') !== FALSE) {
    unset($variables['description']);
  }
  else {
    foreach ($variables['settings_links'] as &$link) {
      if ($link instanceof \Drupal\Core\GeneratedLink) {
        if (!empty($variables['description'])) {
          $variables['description'] = str_replace(':', '', $variables['description']);
        }
        /** @var \Drupal\Core\GeneratedLink $link */
        $generated_link = $link->getGeneratedLink();
        $generated_link = str_replace('views-ajax-link', 'views-ajax-link collection-item', $generated_link);
        $link->setGeneratedLink($generated_link);
      }
      if ($link instanceof \Drupal\Component\Render\MarkupInterface && $variables['settings_links'][0] == strip_tags($variables['settings_links'][0])) {
        $variables['empty_markup_string'] = TRUE;
      }
      else if ($link instanceof \Drupal\Component\Render\MarkupInterface) {
        $link = (string) $link;
        $link = \Drupal\Core\Render\Markup::create(str_replace('views-ajax-link', 'views-ajax-link collection-item', $link));
      }
    }
  }
}

/**
 * Implements hook_preprocess_links().
 */
function material_admin_preprocess_links__dropbutton(&$variables) {
  if (count($variables['links']) === 1) {
    $classes = ['btn', 'grey', 'lighten-3', 'grey-text', 'text-darken-2'];
    $views_classes = ['btn', 'btn-flat', 'darken-3', 'text-darken-2'];
    foreach ($variables['links'] as &$link) {
      if (isset($link['link'])) {
        if (!isset($link['link']['#options']['attributes']['class'])) {
          $link['link']['#options']['attributes']['class'] = [];
        }
        $link_classes = &$link['link']['#options']['attributes']['class'];
        if (in_array('views-ajax-link', $link_classes)) {
          $link_classes = array_merge($link_classes, $views_classes);
        }
        else {
          $link_classes = array_merge($link_classes, $classes);
        }
      }
    }
  }
}

/**
 * Implements hook_preprocess_color_scheme_form().
 */
function material_admin_preprocess_color_scheme_form(&$variables) {
  $variables['#attached']['library'][] = 'material_admin/color';
}

/**
 * Implements hook_preprocess_block() for block content.
 *
 * Disables contextual links for all blocks.
 */
function material_admin_preprocess_block(&$variables) {
  if (isset($variables['title_suffix']['contextual_links'])) {
    unset($variables['title_suffix']['contextual_links']);
    unset($variables['elements']['#contextual_links']);

    $variables['attributes']['class'] = array_diff($variables['attributes']['class'], ['contextual-region']);
  }
}

/**
 * Implements hook_preprocess_textarea() for textarea content.
 *
 * set the default cols to 100 instead of Drupal default of 60, for better readability.
 */
function material_admin_preprocess_textarea(&$variables) {
  $variables['attributes']['cols'] = '100';
}

/**
 * Implements hook_preprocess_select() for textarea content.
 *
 * Set variable for theme_settings select_default compatability
 */
function material_admin_preprocess_select(&$variables) {
  $variables['select_default'] = theme_get_setting('material_admin_select_default');
}

/**
 * Implements hook_preprocess_form_element() for textarea content.
 *
 * Set variable for theme_settings select_default compatability
 */

function material_admin_preprocess_form_element(&$variables) {
  $variables['select_default'] = theme_get_setting('material_admin_select_default');
}
