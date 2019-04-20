angular.module('machineevents').controller('machinesController', function($scope, $timeout, Machines) {
    $scope.machines = [];
    $scope.currentpage = 0;
    $scope.totalMachines = 0;
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
     * getMachines
     */
    function getMachines() {
        try {
            $scope.showLoading = true;
            var ds = Machines.getAll();
            ds.get({
                pag: $scope.currentpage,
                limit: $scope.limitPage
            }, function(response) {
                $scope.showLoading = false;
                $scope.machines = response.data;
                $scope.totalMachines = response.total;
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('machinesController - getMachines: ', error);
            showError('Error on get machines');
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
        $scope.machines = [];
        $scope.currentpage = 0;
        $scope.totalMachines = 0;
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
        getMachines();
    }

    $scope.init();
});