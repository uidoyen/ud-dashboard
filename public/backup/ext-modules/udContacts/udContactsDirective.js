"use strict";
angular.module('udContacts').directive('udContacts', [function () {
    return {
        scope: {
        },
        transclude: true,
        templateUrl:'ext-modules/udContacts/udContactsTemplates.html',
        controller: 'udContactsController',
        link: function (scope, el, attr) {
        }
    };
}]);