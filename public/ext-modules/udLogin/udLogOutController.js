"use strict";
angular.module('udLogin')
.controller('udLogOutController', ['$scope','FBURL','$window', function($scope, FBURL, $window){
	var fbRef = new Firebase(FBURL);
	// expose logout function to scope
	      $scope.logout = function() {
	      	alert();
	        if( unbind ) { unbind(); }
	        profile.$destroy();
	        Auth.$unauth();
	        //$window.location.href = '/#/login';
	      };
	
}]);