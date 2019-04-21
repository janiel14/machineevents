angular.module('machineevents').factory('Cron', function($resource) {
    var _self = {};

    /**
     * get
     * @return {Object} resource
     */
    _self.get = function() {
        return $resource('/api/cron');
    }

    /**
     * save
     * @return {Object} resource
     */
    _self.save = function() {
        return $resource('/api/cron');
    }

    return _self;
});