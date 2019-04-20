angular.module('machineevents').factory('Machines', function($resource) {
    var _self = {};

    /**
     * save
     * @return {Object} resource
     */
    _self.save = function() {
        return $resource('/api/machines');
    }

    /**
     * getAll
     * @return {Object} resource
     */
    _self.getAll = function() {
        return $resource('/api/machines/:pag/:limit');
    }

    /**
     * get
     * @return {Object} resource
     */
    _self.get = function() {
        return $resource('/api/machines/:name');
    }

    /**
     * delete
     * @return {Object} resource
     */
    _self.delete = function() {
        return $resource('/api/machines/:name');
    }

    return _self;
});