var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name: 			{type:String},
	email: 			{type:String, unique:true},
	password: 		{type:String},
	mobile: 		{type:String},
	location: 		{type:String},
	website: 		{type:String},
	twitter: 		{type:String},
	facebook: 		{type:String},
	linkedin: 		{type:String},
	bio: 			{type:String},
	profilepic: 	{data: Buffer, type:String}

});
var User = module.exports = mongoose.model('User', userSchema);

// Get All Users
module.exports.getUsers = function(callback) {
	User.find(callback);
}

// Get One Users
module.exports.getUser = function(callback) {
	User.findOne(callback);
}

//Get User by ID
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

//Create User
module.exports.createUser = function(newUser, callback) {
	newUser.save(callback);
}

// Remove User
module.exports.removeContact = function(id, callback) {
	User.find({_id:id}).remove(callback)
}