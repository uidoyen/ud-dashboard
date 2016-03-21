var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Add User
router.post('/', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
//user object
  var loginUser = new login({
    email:email,
    password:password,
  });

User.getUser(loginUser, function(err, login){
    if(err) {
      console.log(err)
    }
    //$location.url('/articles');
    res.redirect('/articles');
  });

/*
	User.findOne({email:email, password:password}, function(err, user){
		if(err) {
			console.log(err);
			return res.status(500).send();
		}
		if(!user) {
			return res.status(404).send();
		}

		return res.status(200).send();
	})
*/
});

module.exports = router;
