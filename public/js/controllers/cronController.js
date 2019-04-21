angular.module('machineevents').controller('cronController', function($scope, $timeout, $location, Cron) {
    $scope.cron = {
        id: null,
        time: null,
        created_date: null,
        updated_date: null,
    };
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
     * getCron
     */
    function getCron() {
        try {
            $scope.showLoading = true;
            var ds = Cron.get();
            ds.get(function(response) {
                $scope.showLoading = false;
                if (response.data) {
                    $scope.cron = response.data;
                }
            });
        } catch (error) {
            $scope.showLoading = false;
            console.error('cronController - getCron: ', error);
            showError('Error on get cron');
        }
    }

    /**
     * formSubmit
     */
    $scope.formSubmit = function() {
        if ($scope.cron.time < 0) {
            showError('Time need >=0!');
        } else {
            try {
                $scope.showLoading = true;
                var ds = Cron.save();
                ds.save({
                    id: $scope.cron.id,
                    time: $scope.cron.time
                }, function() {
                    $scope.showLoading = false;
                    $location.path("machines");
                });
            } catch (error) {
                $scope.showLoading = false;
                console.error('cronController - formSubmit: ', error);
                showError('Error on save cron');   
            }
        }
    }

    /**
     * init
     */
    $scope.init = function() {
        $scope.cron = {
            id: null,
            time: 0,
            created_date: null,
            updated_date: null,
        };
        $scope.showAlertError =  {
            show: false,
            message: null
        };
        $scope.showLoading = false;
        getCron();
    }

    $scope.init();
});