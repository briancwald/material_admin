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
  if (isset($form['#id']) && strpos($form['#id'], 'views-form') === 0) {
    if (isset($form['header'])) {
      $children = Element::getVisibleChildren($form['header']);
      if (count($children) === 1 && strpos($children[0], '_bulk_form') !== FALSE) {
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
        $form['#attached']['library'][] = 'material_admin/views-bulk-form';
      }
    }
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
