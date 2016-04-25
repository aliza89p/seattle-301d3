(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // DONE: Define a function that hides all main section elements, and then reveals just the #about section:

    //don't need to create a table since not doing anything. Just the show about page.
    $('#articles').hide();
    $('#about').show();

  };

  module.aboutController = aboutController;
})(window);
