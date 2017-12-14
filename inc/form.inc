<?php

use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Render\Element;
use Drupal\Core\Url;


/**
 * Implements hook_form_alter().
 */
function material_admin_form_alter(&$form, FormStateInterface $form_state, $form_id) {
 	if (!empty($form['actions']) && !empty($form['actions']['submit'])) {
    $form['actions']['submit']['#attributes']['class'][] = 'success';
    $form['actions']['submit']['#attributes']['class'][] = 'button';
  }
  // Detect if a Views bulk form is the only element visible in the header, and
  // if so style it inline with the filters.
  $form['#attached']['library'][] = 'material_admin/views-bulk-form';
  if (isset($form['#id']) && strpos($form['#id'], 'views-form') === 0) {
    if (isset($form['header'])) {
      $children = Element::getVisibleChildren($form['header']);
      if (count($children) === 1 && strpos($children[0], 'bulk_form') !== FALSE) {
        $form['actions']['submit']['#attributes']['class'][] = 'visually-hidden';
        $form['header']['#attributes']['class'][] = 'views-bulk-form-header';
        $form['header']['#attributes']['title'] = t('Bulk operations');
        $form['header']['count'] = [
          '#type' => 'container',
          '#attributes' => ['class' => ['views-bulk-form-count']],
        ];
        $form['header']['dropdown'] = [
          '#type' => 'dropbutton',
          '#links' => [],
          '#attributes' => ['class' => ['views-bulk-form-dropdown']],
        ];
        foreach ($form['header'][$children[0]]['action']['#options'] as $key => $option) {
          $form['header']['dropdown']['#links'][$key] = [
            'title' => $option,
            'url' => Url::fromUri('internal:#' . $key),
          ];
        }
      }
    }
  }

  if ($form_id == 'system_modules' && theme_get_setting('material_admin_collapse_module_list')) {
    foreach (Element::children($form['modules']) as $package) {
      $form['modules'][$package]['#open'] = FALSE;
    }
  }


  if ($form['#id']  == 'view-edit-form') {
    $form['actions']['submit']['#attributes']['data-twig-suggestion'] = 'views_button_submit';
    $form['actions']['cancel']['#attributes']['data-twig-suggestion'] = 'views_button_cancel';
    $form['actions']['submit']['#attributes']['class'][] = 'views-button succes';
    $form['actions']['cancel']['#attributes']['class'][] = 'views-button cancel';
    foreach (Element::children($form['displays']['top']['add_display']) as $key) {
      $form['displays']['top']['add_display'][$key]['#attributes']['data-twig-suggestion']= 'views_button_add_display';
    }
  }

  if ($form['#id'] == 'views-ui-preview-form') {
    $form['actions']['button']['#attributes']['data-twig-suggestion'] = 'views_button_preview';
    $form['actions']['button']['#attributes']['class'][] = 'views-button';
  }

  if (get_class($form_state->getFormObject()) === 'Drupal\entity_browser\Form\EntityBrowserForm') {
    _material_admin_form_entity_browser_form_alter($form, $form_state);
  }
}

/**
 * Implements hook_form_node_form_alter ().
 *
 * Add the hook alter for features from seven theme.
 */
function material_admin_form_node_form_alter(&$form, FormStateInterface $form_state, $form_id) {
  /** @var \Drupal\node\NodeInterface $node */
  $node = $form_state->getFormObject()->getEntity();

  if (theme_get_setting('material_admin_node_actions')) {
   $form['#attached']['drupalSettings']['material_admin']['material_admin_node_actions'] = theme_get_setting('material_admin_node_actions');
   $form['actions']['#attributes']['class'][] = 'sticky-node-actions';
  }

  $form['#theme'] = array('node_edit_form');
  $form['advanced']['#type'] = 'container';
  $is_new = !$node->isNew() ? format_date($node->getChangedTime(), 'short') : t('Not saved yet');
  $form['meta'] = array(
    '#attributes' => array('class' => array('entity-meta__header')),
    '#type' => 'container',
    '#group' => 'advanced',
    '#weight' => -100,
    'published' => array(
      '#type' => 'html_tag',
      '#tag' => 'h3',
      '#value' => $node->isPublished() ? t('Published') : t('Not published'),
      '#access' => !$node->isNew(),
      '#attributes' => array(
        'class' => 'entity-meta__title',
      ),
    ),
    'changed' => array(
      '#type' => 'item',
      '#wrapper_attributes' => array('class' => array('entity-meta__last-saved', 'container-inline')),
      '#markup' => '<h4 class="label inline">' . t('Last saved') . '</h4> ' . $is_new,
    ),
    'author' => array(
      '#type' => 'item',
      '#wrapper_attributes' => array('class' => array('entity-meta__author', 'container-inline')),
      '#markup' => '<h4 class="label inline">' . t('Author') . '</h4> ' . $node->getOwner()->getUsername(),
    ),
  );
  $form['revision_information']['#type'] = 'container';
  $form['revision_information']['#group'] = 'meta';
  $form['status']['#group'] = 'actions';
  
  if (isset($form['moderation_state'])) {
    $form['moderation_wrapper'] = array(
      '#type' => 'container',
      '#group' => 'advanced',
      '#weight' => 100,
      '#attributes' => array(
        'class' => 'entity-moderation-wrapper',
        ),
      );
    $form['moderation_state']['#group'] = 'moderation_wrapper';
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function _material_admin_form_entity_browser_form_alter(&$form, FormStateInterface $form_state) {
  if (isset($form['widget']['asset-container'])) {
    foreach (Element::getVisibleChildren($form['widget']['asset-container']) as $asset_title) {
      $asset = &$form['widget']['asset-container'][$asset_title];
      foreach (Element::getVisibleChildren($asset) as $key) {
        $child = &$asset[$key];
        if (isset($child['#name']) && $child['#name'] === 'acquiadam_folder') {
          $child['#attributes']['class'][] = 'no-wrap';
          break;
        }
      }
    }
  }
  if (isset($form['widget']['filter-sort-container'])) {
    $form['widget']['filter-sort-container']['#theme_wrappers'] = ['material_admin_collapsed_form'];
    $form['widget']['filter-sort-container']['filter-actions'] = [
      '#type' => 'container',
      'filter-sort-submit' => $form['widget']['filter-sort-container']['filter-sort-submit'],
      'filter-sort-reset' => $form['widget']['filter-sort-container']['filter-sort-reset'],
    ];
    unset($form['widget']['filter-sort-container']['filter-sort-submit']);
    unset($form['widget']['filter-sort-container']['filter-sort-reset']);
  }
}
