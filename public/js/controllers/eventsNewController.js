angular.module('machineevents').controller('eventsNewController', function($scope, $timeout, Events, $routeParams, $location) {
    $scope.showAlertError =  {
        show: false,
        message: null
    };
    $scope.event = {
        active:  {
            value: 'Y',
            name: 'Active'
        },
        code: '',
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
     * getEvent
     */
    function getEvent() {
        try {
            $scope.showLoading = true;
            var ds = Events.get();
            ds.get({
                name: $routeParams.name == undefined ? 'NULL' : $routeParams.name
            }, function(response) {
                $scope.showLoading = false;
                if (response.data) {
                    $scope.disableName = true;
                    $scope.event = response.data;
                    if ($scope.event.active == "Y") {
                        $scope.event.active = {
                            value: 'Y',
                            name: 'Active'
                        };
                    } else {
                        $scope.event.active = {
                            value: 'N',
                            name: 'Inactive'
                        };
                    }
                }
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('eventsNewController - getEvent: ', error);
            showError('Error on get event');
        }
    }

    /**
     * checkExists
     * @param {String} name
     */
    $scope.checkExists = function(name) {
        try {
            var ds = Events.get();
            ds.get({
                name: name
            }, function(response) {
                if (response.data) {
                    showError('Name is existing!');
                    $scope.event.name = null;
                }
            });
        } catch (error) {
            console.error('eventsNewController - checkExists: ', error);
            showError('Error on check name event');
        }
    }

    /**
     * formSubmit
     */
    $scope.formSubmit = function() {
        try {
            if ($scope.event.active == null || $scope.event.active.length == 0) {
                showError('Select active!');
            } else if ($scope.event.code == null || $scope.event.code.length == 0) {
                showError('Select code!');
            } else if ($scope.event.name == null || $scope.event.name.length == 0) {
                showError('Informe name of event!');
            } else {
                var ds = Events.save();
                ds.save({
                    active: $scope.event.active.value,
                    code: $scope.event.code,
                    name: $scope.event.name
                }, function() {
                    $location.path("events");
                });
            }
        } catch (error) {
            console.error('eventsNewController - formSubmit: ', error);
            showError('Error on save event');
        }
    }

    /**
     * init
     */
    $scope.init = function() {
        $scope.showAlertError =  {
            show: false,
            message: null
        };
        $scope.event = {
            active:  {
                value: 'Y',
                name: 'Active'
            },
            code: '',
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
        getEvent();
    }
    $scope.init();
});