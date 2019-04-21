angular.module('machineevents').factory('MachineEvents', function($resource) {
    var _self = {};

    /**
     * getAll
     * @return {Object} resource
     */
    _self.getAll = function() {
        return $resource('/api/machineevents/:machine/:pag/:limit');
    }

    return _self;
});