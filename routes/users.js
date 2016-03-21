var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var appSecret = process.env.NODE_APP_SECRET;
var User = require('../models/user');

//Add User
router.post('/', function(req, res) {
  var name      = req.body.name;
  var email     = req.body.email;
  var password  = req.body.password;
  var mobile    = req.body.mobile;
  var location  = req.body.location;
  var website   = req.body.website;
  var twitter   = req.body.twitter;
  var facebook  = req.body.facebook;
  var linkedin  = req.body.linkedin;
  var bio       = req.body.bio;
  var profilepic  = req.body.profilepic;
  
  //user object
  var newUser = new User({
    name:name,
    email:email,
    password:password,
    mobile:mobile,
    location:location,
    website:website,
    twitter:twitter,
    facebook:facebook,
    linkedin:linkedin,
    bio:bio,
    profilepic:profilepic
  });
  User.createUser(newUser, function(err, user){
    if(err) {
      console.log(err)
    }
   res.redirect('/users');
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

// POST login
router.post('/login', function(req, res, next){
   console.log(JSON.stringify(req.body));
  //console.log('sdfdsf');
  var email = req.body.email;
  var encryptedPassword = req.body.password;

  User.findOne({
    email: email,
    password: encryptedPassword
  })
  .exec(function(err, user){
    if (err) throw err;
    
    // email and password does not match
    if (!user){
      console.log('Email and password does not match');
      res.cookie('notice', 'Email and password does not match', {
        maxAge: new Date(Date.now() + 10),
        domain: 'invent-ballet.codio.io'
      });
      return res.redirect('/#/login');
    }
      else {
        res.cookie('userID', user._id, {
          maxAge: new Date(Date.now() + 10),
          domain: 'invent-ballet.codio.io'
        });
        return res.redirect('/#/dashboard/overview');
      }
  });

});

// GET register
router.get('/signup', function(req, res, next){
  var notice = req.cookies.notice;
  
  res.render('users/register', {
    notice: notice
  });
});

// POST register
router.post('/signup', function(req, res, next){
  
  var email = req.body('email');
  var password = req.body('password');
  var passwordAgain = req.body('passwordAgain');
  
  // check if empty
  if (!password || !email){
    console.log('Empty fields.');
    res.cookie('notice', 'Please fill in al the fields correctly', {
      maxAge: new Date(Date.now() + 10),
      domain: 'invent-ballet.codio.io'
    });
    
    return res.redirect('/users/signup');    
  }
  
  // check if passwords match
  if (password !== passwordAgain){
    console.log('Passwords does not match');
    res.cookie('notice', 'Passwords does not match', {
      maxAge: new Date(Date.now() + 10),
      domain: 'invent-ballet.codio.io'
    });
    
    return res.redirect('/users/signup');
  }
  
  // check if user exists
  User.findOne({
    email: email
  })
  .exec(function(err, user){
    if (err) throw err;
    
    if (user){
      console.log('User exists');
      res.cookie('notice', 'User exists', {
        maxAge: new Date(Date.now() + 10),
        domain: 'invent-ballet.codio.io'
      });
      return res.redirect('/users/signup');
    }
      else{
        // encryptd the password
        var encryptedPassword = crypto.createHmac('sha256',appSecret)
                  .update(password)
                  .digest('hex');
        
        
        // create a new user
        var user = new User({
          email: email,
          encryptedPassword: encryptedPassword
        });
        user.save(function(err){
          if (err) throw err;
          res.cookie('notice', 'Successfully registered', {
            maxAge: new Date(Date.now() + 10),
            domain: 'invent-ballet.codio.io'
          });
          
          return res.redirect('/users/login');
        });
      }
  });
  
});

router.get('/logout', function(req, res, next){
  res.clearCookie('userID', {
      domain: 'invent-ballet.codio.io'
  });
  res.redirect('/users/login');
});

// Delete Article
router.delete('/:id', function(req, res, next) {
  var id     = req.params.id;
 
// Delete Article
  User.removeContact(id, function(err, user){
    if(err) {
      console.log(err)
    }
    //req.location('/articles');
    res.redirect('/users');
  });
});
module.exports = router;