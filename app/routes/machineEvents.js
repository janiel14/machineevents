module.exports = function(app) {
    const controller = app.controllers.machineEvents;
    app.route('/api/machineevents/:machine/:pag/:limit')
        .get(controller.getMachineEvents);
}