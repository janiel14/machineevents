angular.module('machineevents').controller('eventsController', function($scope, $timeout, Events) {
    $scope.events = [];
    $scope.currentpage = 0;
    $scope.totalEvents = 0;
    $scope.limitPage = 10;
    $scope.event = {
        active: null,
        code: null,
        name: null,
        created_date: null,
        updated_date: null,
    };
    $scope.filterField = '';
    $scope.showAlertError =  {
        show: false,
        message: null
    };
    $scope.showLoading = false;

    /**
     * showError
     * @param {String} message 
     */
    function showError(message) {
        $scope.showAlertError.message = message;
        $scope.showAlertError.show = true;
        $timeout(function() {
            $scope.showAlertError =  {
                show: false,
                message: null
            };
        }, 3000);
    }

    /**
     * getEvents
     */
    function getEvents() {
        try {
            $scope.showLoading = true;
            var ds = Events.getAll();
            ds.get({
                pag: $scope.currentpage,
                limit: $scope.limitPage
            }, function(response) {
                $scope.showLoading = false;
                $scope.events = response.data;
                $scope.totalEvents = response.total;
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('eventsController - getEvents: ', error);
            showError('Error on get events');
        }
    }

    /**
     * eventPaginationChange
     * @param {Number} next
     * @param {Number} prev
     */
    $scope.eventPaginationChange = function(next, prev) {
        if (next == 1) {
            $scope.currentpage = 0
        } else {
            $scope.currentpage = next;
        }
    }

    /**
     * init
     */
    $scope.init = function() {
        $scope.events = [];
        $scope.currentpage = 0;
        $scope.totalEvents = 0;
        $scope.limitPage = 10;
        $scope.event = {
            active: null,
            code: null,
            name: null,
            created_date: null,
            updated_date: null,
        };
        $scope.filterField = '';
        $scope.showAlertError =  {
            show: false,
            message: null
        };
        $scope.showLoading = false;
        getEvents();
    }

    $scope.init();
});