module.exports = function(app) {
    const controller = app.controllers.events;
    app.route('/api/events')
        .post(controller.createOrUpdate)
        .put(controller.createOrUpdate);
    app.route('/api/events/:name')
        .get(controller.getEvent)
        .delete(controller.delete);
    app.route('/api/events/:pag/:limit')
        .get(controller.getEvents);
}