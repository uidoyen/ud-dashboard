'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
app.config(function($stateProvider, $urlRouterProvider) { 

    //$urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: '../ext-modules/base.html'
      })

   .state('login', {
      url: '/login',
      parent: 'base',
      templateUrl: '../ext-modules/udLogin/udLoginTemplates.html'
    })
    .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: '../ext-modules/psDashboard/psDashboardTemplate.html'
    })
    .state('articles', {
          url: '/articles',
          parent: 'dashboard',
          templateUrl: '../ext-modules/udJobs/udJobsTemplates.html',
          controller:'articleListController'

    })

})
