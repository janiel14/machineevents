module.exports = function(app) {
    const controller = app.controllers.machines;
    app.route('/api/machines')
        .post(controller.createOrUpdate)
        .put(controller.createOrUpdate);
    app.route('/api/machines/:name')
        .get(controller.getMachine)
        .delete(controller.delete);
    app.route('/api/machines/:pag/:limit')
        .get(controller.getMachines);
}