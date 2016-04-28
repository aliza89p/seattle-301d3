(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    debugger;
    articleView.index(ctx.articles);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This is the first callback in "page('/article/:id'...)" from routes.js. This creates a helper function called articleData which reassigns the value for ctx.articles. We can then use ctx.articles in the "next" callback function which is articlesController.index. Next we invoke the Article.findWhere function which uses webDB.execute function to fill in fields using SQL. This method can be found in article.js.

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This is the first callback function in the page function that routes to /author/:authorName. Iniside the articlesController.loadByAuthor function an authorData helper is created, which we use to reassign the value for ctx.articles.  We can then use ctx.articles in the "next" callback function which is articlesController.index.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This is the first callback function in the page function that routes to /category/:categoryName. Iniside the articlesController.loadByCategory function a categoryData helper is created, which we use to reassign the value for ctx.articles.  We can then use ctx.articles in the "next" callback function which is articlesController.index.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // DONE: What does this method do?  What is it's execution path?
  //This is the first callback in the first page function which routes to the index page and is located in routes.js. This also assigns a value to ctx.articles which can be used in the next callback which is articlesController.index.
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
