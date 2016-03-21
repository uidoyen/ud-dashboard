'use strict';
angular
  .module('app', [
    'ui.router',
    'ngCookies',
    'firebase',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ngSanitize',
    'ngAria'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'udLoginController'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: '../ext-modules/psDashboard/psDashboardTemplate.html'
          })
          .state('articles', {
            url: '/articles',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udJobs/udJobsTemplates.html',
            controller:'articleListController'
          })
          .state('addarticle', {
            url: '/articles/add',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udJobs/udAddArticleTemplate.html',
            controller:'addArticleController'
          })
          .state('editarticle', {
            url: '/articles/edit/:id',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udJobs/udEditArticleTemplate.html',
            controller:'editArticleController'
          })
          .state('articledetail', {
            url: '/articles/details/:id',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udJobs/udArticleDetailsTemplate.html',
            controller:'articleDetailController'
          })
          .state('users', {
            url: '/users',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udContacts/udUsersTemplates.html',
            controller:'usersController'
          })
          .state('addusers', {
            url: '/users/add',
            parent: 'dashboard',
            templateUrl: '../ext-modules/udContacts/addUserTemplate.html',
            controller:'addUsersController'
        })
       .state('edituser', {
          url: '/users/edit/:id',
          parent: 'dashboard',
          templateUrl: '../ext-modules/udContacts/editUserTemplate.html',
          controller:'editUsersController'
        })

  })
  .constant('FBURL', 'https://udmycontacts.firebaseio.com/');
