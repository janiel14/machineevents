const Schema = require('mongoose').Schema;
const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('machine_events', new Mongoose.Schema({
        created_date: 'Date',
        machine: 'String',
        code: 'String'
    }));
}