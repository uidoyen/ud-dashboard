"use strict";

angular.module("psDashboard").directive("udWelcome", function () {
    return {
        scope: {
            title: '@',
            subtitle: '@',
        },
        controller:'psWelcomeController',
        templateUrl: "ext-modules/psDashboard/psWelcomeTemplate.html"
    };
});