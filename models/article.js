var mongoose = require('mongoose');

var articlesSchema = mongoose.Schema({
	title: {
		type:String,
		index:true,
		required:true
	},
	body: {
		type:String
	},
	category: {
		type:String,
		index:true,
		required:true
	},
	user: {
		type:String,
		index:true,
		required:true
	},
	date: {
		type:Date,
		default: Date.now
	}
});
var Article = module.exports = mongoose.model('Articles', articlesSchema);

// Get All Articles
module.exports.getArticles = function(callback) {
	Article.find(callback);
}
//Get Articles by ID
module.exports.getArticleById = function(id, callback) {
	Article.findById(id, callback);
}

//Get Category articles
module.exports.getArticlesByCategory = function(category, callback) {
	var query = {category:category};
	Article.find(query, callback);
}

//Get User articles
module.exports.getArticlesByUser = function(user, callback) {
	var query = {user:user};
	Article.find(query, callback);
}


//Add an articles
module.exports.createArticle = function(newArticle, callback) {
	newArticle.save(callback);
}

//Update an articles
module.exports.updateArticle = function(id, data, callback) {
	var title 		= data.title;
	var body 		= data.body;
	var category 	= data.category;
	var user 		= data.user;
	var query		= {_id:id}
	Article.findById(id, function(err, article){
		if(!article) {
			return next(new Error("Could not load"))
		}else {
			article.title 		= title;
			article.body 		= body;
			article.category 	= category;
			article.user 		= user;
			article.save(callback)
		}
	});
}
// Remove Article
module.exports.removeArticle = function(id, callback) {
	Article.find({_id:id}).remove(callback)
}