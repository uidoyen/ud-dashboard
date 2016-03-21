"use strict";

angular.module('app')
.controller('usersController', ['$window', '$location','$scope','$http', '$stateParams', function($window, $location, $scope, $http, $stateParams){
	$http.get('/users').success(function(data){
		$scope.users = data;
	});

	$scope.removeContact = function(id){
		$http.delete('/users/'+ id).success(function(data){
			console.log(data)
		});
		$window.location.reload();
		//$location.reload();
	}

	$scope.showAddForm = function(){
		$scope.addFormShow = true;
		//$scope.addFormShow = !$scope.addFormShow;
	};

	$scope.hideit = function(){
		$scope.addFormShow = false;
		$scope.contactShow = false;
	};

}]);

//Add Users Controller
angular.module('app')
.controller('addUsersController', ['$location', '$window', '$rootScope', '$scope','$http', function($location, $window, $rootScope, $scope, $http){
	$scope.registerUser = {
		password: '',
		confirmPassword: ''
	};

	$scope.addUser = function(){
	var errors = [];
	//$scope.registerUser.password = "dfdsfd";
	if($scope.registerUser.password !== $scope.registerUser.confirmPassword){
		errors.push('Password must match');
	}
	
	if(errors.length > 0) {
		$scope.errors = errors;
		return;
	}
		var data = {
			name: 					$scope.name,
			email: 					$scope.email,
			password: 				$scope.registerUser.password,
			mobile: 				$scope.mobile,
			location: 				$scope.location,
			website: 				$scope.website,
			twitter: 				$scope.twitter,
			facebook: 				$scope.facebook,
			linkedin: 				$scope.linkedin,
			bio: 					$scope.bio,
			profilepic: 			$scope.profilepic,
		}
		$http.post('/users',data).success(function(err, status){
			console.log(status)
		});
		$location.url('/dashboard/users');
	}
	
}]);


//Update Profile
angular.module('app').controller('editUsersController', ['$location', '$window', '$stateParams', '$scope','$http', function($location, $window, $stateParams, $scope, $http){
	

	// Get Article Details
	$http.get('/articles/'+ $stateParams.id).success(function(data){
		$scope.article = data;
	});

	$scope.updateArticle = function(){
		var data = {
			id: 		$stateParams.id,
			title: 		$scope.article.title,
			category: 	$scope.article.category,
			user: 		$scope.article.user,
			body: 		$scope.article.body
		}
		$http.put('/articles',data).success(function(err, status){
			console.log(status)
		});
		$location.url('/dashboard/articles');
		
	}
	
}]);