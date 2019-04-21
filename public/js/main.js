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
    $routeProvider.when('/machines/events/:name', {
        templateUrl: 'views/machines_events.html',
        controller: 'machinesEventsController'
    });
    $routeProvider.when('/events', {
        templateUrl: 'views/events.html',
        controller: 'eventsController'
    });
    $routeProvider.when('/events/new', {
        templateUrl: 'views/events_new.html',
        controller: 'eventsNewController'
    });
    $routeProvider.when('/events/edit/:name', {
        templateUrl: 'views/events_new.html',
        controller: 'eventsNewController'
    });
    $routeProvider.when('/cron', {
        templateUrl: 'views/cron.html',
        controller: 'cronController'
    });
    $routeProvider.otherwise({redirectTo: '/machines'});
});