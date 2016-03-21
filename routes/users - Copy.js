var express = require('express');
var router = express.Router();
var User = require('../models/user');

//Add User
router.post('/', function(req, res) {
  var name      = req.body.name;
  var email     = req.body.email;
  var password  = req.body.password;
  
  //user object
  var newUser = new User({
    name:name,
    email:email,
    password:password,
  });

  User.createUser(newUser, function(err, user){
    if(err) {
      console.log(err)
    }
    //$location.url('/articles');
    res.redirect('/articles');
  });

});


/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  User.getUsers(function(err, users){
  	if(err) {
  		console.log(err)
  	}
  	res.json(users)
  })
});

router.get('/:id', function(req, res, next) {
  //res.send('respond with a resource');
  User.getUserById(req.params.id, function(err, user){
  	if(err) {
  		console.log(err)
  	}
  	res.json(user)
  })
});
module.exports = router;
