(function(module) {
  var adminController = {};

  adminController.index = function() {

    Article.fetchAll(articleView.initAdminPage);

    $('#articles').hide();
    $('#about').hide();
    $('#admin').show();

  };

  module.adminController = adminController;
})(window);
