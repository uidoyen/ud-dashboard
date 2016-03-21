"use strict";
angular.module('udLogin').directive('udLogin', [function(){
	return {
        scope: {
        },
        transclude: true,
        templateUrl:'ext-modules/udLogin/udLoginTemplates.html',
        controller: 'udLoginController',
        link: function (scope, el, attr) {
        }
    };
}]);