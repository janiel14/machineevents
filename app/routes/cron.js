module.exports = function(app) {
    const controller = app.controllers.cron;
    app.route('/api/cron')
        .post(controller.createOrUpdate)
        .get(controller.getCron);
}