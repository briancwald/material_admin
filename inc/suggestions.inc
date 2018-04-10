<?php

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 * @param array $suggestions
 * @param array $variables
 */

/**
 * Implements hook_theme_suggestions_HOOK_alter().
 */
function material_admin_theme_suggestions_page_alter(array &$suggestions, array $variables) {
  $route_match = \Drupal::routeMatch()->getRouteName();
  $portal_paths = array('user.pass', 'user.login', 'user.register');
  if (in_array($route_match, $portal_paths, true) && theme_get_setting('material_admin_portal_login')) {
    $suggestions[] = 'page__portal_login';
  }
}

function material_admin_theme_suggestions_input_alter(&$suggestions, array $variables) {
  $element = $variables['element'];
  if (isset($element['#attributes']['data-twig-suggestion'])) {
    $suggestions[] = 'input__' . $element['#type'] . '__' . $element['#attributes']['data-twig-suggestion'];
  }

  if (isset($variables['element']['#type']) && $variables['element']['#type'] == 'submit') {
    // Paragraph button
    if (isset($variables['element']['#paragraphs_mode'])) {
      $suggestions[] = 'input__submit__paragraphs_' . $variables['element']['#paragraphs_mode'];
    }
    if (isset($variables['element']['#name']) && $variables['element']['#name'] == 'button_add_modal') {
      $suggestions[] = 'input__submit__button';
    }
  }
}

function material_admin_theme_suggestions_form_element_alter(array &$suggestions, array $variables, $hook) {
  if ( $variables['element']['#type'] === 'select') {
    $suggestions[] = $hook . '__select';
  }
}

/**
 * Implements hook_theme().
 */

function material_admin_theme() {
  $path = drupal_get_path('theme', 'material_admin');
  return [
    // Template suggestion for the breadcrumb page title placeholder.
    'page_title__breadcrumb' => [
      'base hook' => 'page_title',
      'path' => $path . '/templates/navigation',
    ],
    'material_admin_collapsed_form' => [
      'base hook' => 'material_admin_collapsed_form',
      'path' => $path . '/templates/form',
      'variables' => [
        'children' => [],
      ],
    ],
  ];
}
