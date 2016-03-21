"use strict";
angular.module('app')
.config(['$routeProvider', function ($routeProvider) {
    var routes = [
        {
            abstract: true,
            url: '',
            config: {
                templateUrl: '../ext-modules/base.html'
                controller:'loginRegisterController'
            }
        },
        {
            url: '/register',
            config: {
                templateUrl: 'udLoginRegisterTemplate.html'
                controller:'loginRegisterController'
            }
        },
        {
            url: '/dashboard',
            config: {
                template: '<wwa-dashboard></wwa-dashboard>'
            }
        },
        {
            url: '/contacts',
            config: {
                template: '<wwa-contact></wwa-contact>'
            }
        },
        {
            url: '/login',
            config: {
                template: '<wwa-login></wwa-login>'
            }
        },
        {
            url: '/articles',
            config: {
                //template: '<wwa-Jobs></wwa-Jobs>'
                templateUrl:'../ext-modules/udJobs/udJobsTemplates.html',
                controller:'articleListController'
            }
        },
        {
            url: '/articles/details/:id',
            config: {
                templateUrl:'../ext-modules/udJobs/udArticle.view.html',
                controller:'articleDetailController'
            }
        },
         {
            url: '/articles/add',
            config: {
                templateUrl:'../ext-modules/udJobs/udAddArticleTemplate.html',
                controller:'addArticleController'
            }
        },
         {
            url: '/articles/edit/:id',
            config: {
                templateUrl:'../ext-modules/udJobs/udEditArticleTemplate.html',
                controller:'editArticleController'
            }
        },
        
        {
            url: '/logout',
            config: {
                template: 'dsfsdf'
            }
        },
        {
            url: '/locations',
            config: {
                template: '<wwa-locations></wwa-locations>'
            }
        },
        {
            url: '/guides',
            config: {
                template: '<wwa-guides></wwa-guides>'
            }
        }
    ];

    routes.forEach(function (route) {
        $routeProvider.when(route.url, route.config);
    });
    $routeProvider.otherwise({ redirectTo: '/register' });    
}]);