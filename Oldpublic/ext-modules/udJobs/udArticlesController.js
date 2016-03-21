"use strict";
angular.module('app').controller('articleListController', ['$window', '$location','$scope','$http', '$routeParams', function($window, $location, $scope, $http, $routeParams){
	$scope.$state = $state;
	$http.get('/articles').success(function(data){
		$scope.articles = data;
		
		$scope.tableSelection = {};
		$scope.isAll = false;
		$scope.selectAllRows = function() {
		
	    //check if all selected or not
	    if ($scope.isAll === false) {
	      angular.forEach($scope.articles, function(row, index) {
	        $scope.tableSelection[index] = true;
	      });
	      $scope.isAll = true;
	      
	    }else {
	    	angular.forEach($scope.articles, function(row, index) {
	        	$scope.tableSelection[index] = false;
	      	});
	    	$scope.isAll = false;
	    }
	  };

	  $scope.removeSelectedRows = function() {
	    //start from last index because starting from first index cause shifting
	    //in the array because of array.splice()
	    for (var i = $scope.articles.length - 1; i >= 0; i--) {
	      if ($scope.tableSelection[i]) {
	        //delete row from data
	        $scope.data.splice(i, 1);
	        //delete rowSelection property
	        delete $scope.tableSelection[i];
	      }
	    }
	  };
	});


	//Get Categories
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});
	
	//Get Users
	$http.get('/users').success(function(data){
		$scope.users = data;
	});

	$scope.removeArticle = function(id){
		$http.delete('/articles/'+ id).success(function(data){
			console.log(data)
		});
		$window.location.reload();
		//$location.reload();
	}
}]);

angular.module('udJobs').controller('articleDetailController', ['$window', '$location','$scope','$http', '$routeParams', function($window, $location, $scope, $http, $routeParams){
	$http.get('/articles/'+ $routeParams.id).success(function(data){
		$scope.article = data;
	});
	/*$scope.removeArticle = function(id){
		$http.delete('/articles/'+ id).success(function(data){
			console.log(data)
		});
		$window.location.reload();
		//$location.reload();
	}*/
}]);

//Get Categories
angular.module('udJobs').controller('addArticleController', ['$location', '$window', '$rootScope', '$scope','$http', function($location, $window, $rootScope, $scope, $http){
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});

	//Get Users
	$http.get('/users').success(function(data){
		$scope.users = data;
	});

	$scope.addArticle = function(){
		var data = {
			title: $scope.title,
			category: $scope.category,
			user: $scope.user,
			body: $scope.body
		}
		$http.post('/articles',data).success(function(err, status){
			console.log(status)
		});
		$location.url('/articles');
	}
	
}]);

//Update Article
angular.module('udJobs').controller('editArticleController', ['$location', '$window', '$routeParams', '$scope','$http', function($location, $window, $routeParams, $scope, $http){
	// Get Categories
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});	
	
	// Get Article Details
	$http.get('/articles/'+ $routeParams.id).success(function(data){
		$scope.article = data;
	});

	$scope.updateArticle = function(){
		var data = {
			id: 		$routeParams.id,
			title: 		$scope.article.title,
			category: 	$scope.article.category,
			user: 		$scope.article.user,
			body: 		$scope.article.body
		}
		$http.put('/articles',data).success(function(err, status){
			console.log(status)
		});
		$location.url('/articles');
		
	}
	
}]);

