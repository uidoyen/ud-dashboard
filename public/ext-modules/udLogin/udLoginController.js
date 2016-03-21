'use strict';
angular.module('app')
 .controller('udLoginController',['$location', '$window', '$rootScope', '$scope','$http', function($location, $window, $rootScope, $scope, $http){
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
		var data = {
			name: $scope.registerUser.name,
			email: $scope.registerUser.email,
		  	password: $scope.registerUser.password
		}
		$http.post('/users',data).success(function(err, status){
			console.log(status)
		});
		$location.url('/dashboard/articles');

	};

  $scope.login = function(){
  	/*var user = [];
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
	}*/
	var data = {
		email: $scope.registerUser.email,
	  	password: $scope.registerUser.password
	}
	$http.post('users/login',data).success(function(err, status){
		if(err) {
			console.log(err);
		}
	});
	//$location.url('/dashboard/articles');
  };

  }]);
