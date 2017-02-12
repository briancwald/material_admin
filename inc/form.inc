<?php

/**
 * Implements hook_form_alter().
 * @param $form
 * @param $form_state
 * @param $form_id
 */
function material_admin_form_alter(&$form, \Drupal\Core\Form\FormStateInterface $form_state, $form_id) {
	if (theme_get_setting('material_admin_node_actions')) {
  		$form['#attached']['drupalSettings']['material_admin']['material_admin_node_actions'] = theme_get_setting('material_admin_node_actions');
		$form['actions']['#attributes']['class'][] = 'sticky-node-actions';
	}

 	if (!empty($form['actions']) && !empty($form['actions']['submit'])) {
    	$form['actions']['submit']['#attributes']['class'][] = 'success';
    	$form['actions']['submit']['#attributes']['class'][] = 'button';
  	}
}
