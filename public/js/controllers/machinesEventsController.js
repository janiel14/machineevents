angular.module('machineevents').controller('machinesEventsController', function($scope, $timeout, $routeParams, MachineEvents, Machines) {
    $scope.machineEvents = [];
    $scope.currentpage = 0;
    $scope.totalMachineEvents = 0;
    $scope.limitPage = 10;
    $scope.machine = {
        active: null,
        status: null,
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
     * getMachine
     */
    function getMachine(cb) {
        try {
            $scope.showLoading = true;
            var ds = Machines.get();
            ds.get({
                name: $routeParams.name == undefined ? 'NULL' : $routeParams.name
            }, function(response) {
                $scope.showLoading = false;
                $scope.machine = response.data;
                cb(true);
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('machineEventsController - getMachine: ', error);
            showError('Error on get machine');
            cb(null);
        }
    }

    /**
     * getMachineEvents
     */
    function getMachineEvents() {
        try {
            $scope.showLoading = true;
            var ds = MachineEvents.getAll();
            ds.get({
                machine: $scope.machine.name,
                pag: $scope.currentpage,
                limit: $scope.limitPage
            }, function(response) {
                $scope.showLoading = false;
                $scope.machineEvents = response.data;
                $scope.totalMachineEvents = response.total;
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('machineEventsController - getMachineEvents: ', error);
            showError('Error on get machine');
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
        $scope.machineEvents = [];
        $scope.currentpage = 0;
        $scope.totalMachineEvents = 0;
        $scope.limitPage = 10;
        $scope.machine = {
            active: null,
            status: null,
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
        getMachine(function() {
            getMachineEvents();
        });
    }

    $scope.init();
});