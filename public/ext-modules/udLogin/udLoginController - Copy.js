"use strict";
app.controller('udLoginController', ['$scope','FBURL','$window', '$rootScope', function($scope, FBURL, $window, $rootScope){
	var fbRef = new Firebase(FBURL);
	$scope.errors = [];
	//$scope.simpleLogin = $firebaseSimpleLogin(fbRef);
	$scope.showRegister = function(){
		$scope.registerShow = true;
		$scope.loginShow = false;
	};
	$scope.showLogin = function(){
		$scope.registerShow = false;
		$scope.loginShow = true;
	};
	$scope.registerUser = {
		email: '',
		password: '',
		confirmPassword: ''
	};
	$scope.loginUser = {
		email: '',
		password: '',
	};
	//register form
	$scope.register = function(){		
		var errors = [];
		var user = $scope.registerUser;

		if($scope.registerUser.email === ''){
			errors.push('Please enter an email');
		}
		if(user.password === ''){
			errors.push('Password must not be blank');
		}
		if($scope.registerUser.password !== $scope.registerUser.confirmPassword){
			errors.push('Password must match');
		}

		if(errors.length > 0) {
			$scope.errors = errors;
			return;
		}
		fbRef.createUser({
		  email: $scope.registerUser.email,
		  password: $scope.registerUser.password
		}, function(error, userData) {
		  if (error) {
		    switch (error.code) {
		      case "EMAIL_TAKEN":
		        console.log("The new user account cannot be created because the email is already in use.");
		        break;
		      case "INVALID_EMAIL":
		        console.log("The specified email is not a valid email.");
		        break;
		      default:
		        console.log("Error creating user:", error);
		    }
		  } else {
		  	$window.location.href = '/#/dashboard';
		    console.log("Successfully created user account with uid:", userData.uid);
		  }
		});

		/*var promise = fbRef.createUser({$scope.registerUser.email, $scope.registerUser.password});
		promise.then(function(user){
			console.log(user);
		}, function(error) {
			console.log(error);
		});*/
	};
	
	//login form
	$scope.login = function(){
		var user = [];
		var errors = [];
		if($scope.loginUser.email === ''){
			errors.push('Please enter an email');
		}
		if($scope.loginUser.password === ''){
			errors.push('Please enter password');
		}
		if(errors.length > 0) {
			$scope.errors = errors;
			return;
		}
		fbRef.authWithPassword({
		  email    : $scope.loginUser.email,
		  password : $scope.loginUser.password
		}, function(error, authData) {
		  if (error) {
		    console.log("Login Failed!", error);
		  } else {
		  $scope.user = authData;
		    console.log("Authenticated successfully with payload:", authData);
		    $window.location.href = '/#/dashboard';
		  }
		});
	};
}]);