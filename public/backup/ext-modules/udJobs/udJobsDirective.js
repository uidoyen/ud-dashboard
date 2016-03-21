angular.module('udJobs').directive('udJobs', [function(){
	 return {
        templateUrl:'ext-modules/udJobs/udJobsTemplates.html',
        controller: 'articleListController'
    };
}]);