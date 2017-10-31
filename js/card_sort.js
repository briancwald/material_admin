/**
 * @file
 * Card 
 *
 */
(function ($, Drupal) {
 Drupal.behaviors.material_card_sort = {
    attach: function(context) {
      var options = {
        valueNames: ['card-title'],
        searchClass: "form-search"
      };

      var cardList = new List('cardGrid', options);
    }
  };
}(jQuery, Drupal));
