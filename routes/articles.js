var express = require('express');
var router = express.Router();
var Article = require('../models/article');
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  Article.getArticles(function(err, articles){
  	if(err) {
  		console.log(err)
  	}
  	res.json(articles)
  })
});
router.get('/:id', function(req, res, next) {
  //res.send('respond with a resource');
  Article.getArticleById(req.params.id, function(err, article){
  	if(err) {
  		console.log(err)
  	}
  	res.json(article)
  })
});
router.get('/category/:name', function(req, res, next) {
  Article.getArticlesByCategory(req.params.name, function(err, articles){
  	if(err) {
  		console.log(err)
  	}
  	res.json(articles)
  })
});

router.get('/user/:name', function(req, res, next) {
  Article.getArticlesByUser(req.params.name, function(err, articles){
    if(err) {
      console.log(err)
    }
    res.json(articles)
  })
});


//Add Article
router.post('/', function(req, res, next) {
  var title     = req.body.title;
  var body      = req.body.body;
  var category  = req.body.category;
  var user      = req.body.user;
  
  //article object

  var newArticle = new Article({
    title:title,
    category:category,
    user:user,
    body:body
  });

  Article.createArticle(newArticle, function(err, article){
    if(err) {
      console.log(err)
    }
    //$location.url('/articles');
    res.redirect('/articles');
  });
});

// Update Article
router.put('/', function(req, res, next) {
  var id     = req.body.id;
  var data   = {
    title     : req.body.title,
    body      : req.body.body,
    category  :req.body.category,
    user      :req.body.user

};
// Update Article
  Article.updateArticle(id, data, function(err, article){
    if(err) {
      console.log(err)
    }
    //req.location('/articles');
    res.redirect('/articles');
  });
});

// Delete Article
router.delete('/:id', function(req, res, next) {
  var id     = req.params.id;
 
// Delete Article
  Article.removeArticle(id, function(err, article){
    if(err) {
      console.log(err)
    }
    //req.location('/articles');
    res.redirect('/articles');
  });
});
module.exports = router;
