angular.module('machineevents').factory('Events', function($resource) {
    var _self = {};

    /**
     * save
     * @return {Object} resource
     */
    _self.save = function() {
        return $resource('/api/events');
    }

    /**
     * getAll
     * @return {Object} resource
     */
    _self.getAll = function() {
        return $resource('/api/events/:pag/:limit');
    }

    /**
     * get
     * @return {Object} resource
     */
    _self.get = function() {
        return $resource('/api/events/:name');
    }

    /**
     * delete
     * @return {Object} resource
     */
    _self.delete = function() {
        return $resource('/api/events/:name');
    }

    return _self;
});