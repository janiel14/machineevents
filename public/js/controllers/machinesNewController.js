angular.module('machineevents').controller('machinesNewController', function($scope, $timeout, Machines, Events, $routeParams) {
    $scope.events = [];
    $scope.showAlertError =  {
        show: false,
        message: null
    };
    $scope.machine = {
        active:  {
            value: 'Y',
            name: 'Active'
        },
        status: '',
        name: '',
        created_date: null,
        updated_date: null
    };
    $scope.listActive = [
        {
            value: 'Y',
            name: 'Active'
        }, {
            value: 'N',
            name: 'Inactive' 
        }
    ];
    $scope.showLoading = false;
    $scope.disableName = false;

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
    function getMachine() {
        try {
            $scope.showLoading = true;
            var ds = Machines.get();
            ds.get({
                name: $routeParams.name
            }, function(response) {
                $scope.showLoading = false;
                if (response.data) {
                    $scope.disableName = true;
                    $scope.machine = response.data;
                    if ($scope.machine.active == "Y") {
                        $scope.machine.active = {
                            value: 'Y',
                            name: 'Active'
                        };
                    } else {
                        $scope.machine.active = {
                            value: 'N',
                            name: 'Inactive'
                        };
                    }
                    $scope.machine.status = {
                        name: $scope.machine.status
                    };
                }
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('machinesNewController - getMachine: ', error);
            showError('Error on get machine');
        }
    }

    /**
     * getEvents
     * @param {Boolean} cb 
     */
    function getEvents(cb) {
        try {
            $scope.showLoading = true;
            var ds = Events.getAll();
            ds.get({
                pag: 0,
                limit: Number.MAX_VALUE
            }, function(response) {
                $scope.showLoading = false;
                $scope.events = response.data;
                cb(true);
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('machinesNewController - getEvents: ', error);
            showError('Error on get events');
            cb(null);
        }
    }

    /**
     * checkExists
     * @param {String} name
     */
    $scope.checkExists = function(name) {
        try {
            var ds = Machines.get();
            ds.get({
                name: name
            }, function(response) {
                if (response.data) {
                    showError('Name is existing!');
                    $scope.machine.name = null;
                }
            });
        } catch (error) {
            console.error('machinesNewController - checkExists: ', error);
            showError('Error on check name machine');
        }
    }

    /**
     * formSubmit
     */
    $scope.formSubmit = function() {
        try {
            if ($scope.machine.active == null || $scope.machine.active.length == 0) {
                showError('Select active!');
            } else if ($scope.machine.status == null || $scope.machine.status.length == 0) {
                showError('Select status!');
            } else if ($scope.machine.name == null || $scope.machine.name.length == 0) {
                showError('Informe name of machine!');
            } else {
                var ds = Machines.save();
                ds.$save({
                    active: $scope.machine.active.value,
                    status: $scope.machine.status.name,
                    name: $scope.machine.name
                }, function(response) {
                    console.log(response);
                });
            }
        } catch (error) {
            console.error('machinesNewController - formSubmit: ', error);
            showError('Error on save machine');
        }
    }

    /**
     * init
     */
    $scope.init = function() {
        $scope.events = [];
        $scope.showAlertError =  {
            show: false,
            message: null
        };
        $scope.machine = {
            active:  {
                value: 'Y',
                name: 'Active'
            },
            status: '',
            name: '',
            created_date: null,
            updated_date: null
        };
        $scope.listActive = [
            {
                value: 'Y',
                name: 'Active'
            }, {
                value: 'N',
                name: 'Inactive' 
            }
        ];
        $scope.showLoading = false;
        $scope.disableName = false;
        getEvents(function() {
            getMachine();
        });
    }
    $scope.init();
});