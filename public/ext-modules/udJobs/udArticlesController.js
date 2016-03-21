"use strict";
angular.module('app').controller('articleListController', ['$window', '$location','$scope','$http', '$stateParams', function($window, $location, $scope, $http, $stateParams){
	
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

angular.module('app').controller('articleDetailController', ['$window', '$location','$scope','$http', '$stateParams', function($window, $location, $scope, $http, $stateParams){
	$http.get('/articles/'+ $stateParams.id).success(function(data){
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

//Add Article Controller
angular.module('app').controller('addArticleController', ['$location', '$window', '$rootScope', '$scope','$http', function($location, $window, $rootScope, $scope, $http){
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
		$location.url('/dashboard/articles');
	}
	
}]);

//Update Article
angular.module('app').controller('editArticleController', ['$location', '$window', '$stateParams', '$scope','$http', function($location, $window, $stateParams, $scope, $http){
	
	// Get Categories
	$http.get('/categories').success(function(data){
		$scope.categories = data;
	});	
	
	//Get Users
	$http.get('/users').success(function(data){
		$scope.users = data;
	});


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

