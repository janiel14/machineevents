angular.module('machineevents', ['ngRoute','ngResource','angularUtils.directives.dirPagination']).config(function($routeProvider) {

    //routes
    $routeProvider.when('/machines', {
        templateUrl: 'views/machines.html',
        controller: 'machinesController'
    });
    $routeProvider.when('/machines/new', {
        templateUrl: 'views/machines_new.html',
        controller: 'machinesNewController'
    });
    $routeProvider.when('/machines/edit/:name', {
        templateUrl: 'views/machines_new.html',
        controller: 'machinesNewController'
    });
    $routeProvider.when('/events', {
        templateUrl: 'views/events.html',
        controller: 'eventsController'
    });
    $routeProvider.otherwise({redirectTo: '/machines'});
});