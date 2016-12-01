/**
 * @file
 * Generic functions DF Admin
 *
 */

(function ($, Drupal) {


// Make breadcrumbs more useful by adding the current page
$(document).ready(function () {
	var title = $('.page-title').text();
	console.log(title)
	$('.breadcrumb-nav ol').append('<li><span>' + title + '</span></li>');

	});

})(jQuery, Drupal);