(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    debugger;
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //Creating a loadById method on the articlesController object which takes in

  //The var articleData is setting up a helper function. Article.findWhere allows us to run a webDB execute. ctx.articles is the object with all of our information. ctx.articles is only available inside this function.
  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //This is the first callback in the route to the index page which is located in routes.js. This also assigns a value to ctx.articles which can be used in the next callback.
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };

  module.articlesController = articlesController;
})(window);
