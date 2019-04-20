const Schema = require('mongoose').Schema;
const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('events', new Mongoose.Schema({
        active: 'String',
        code: 'String',
        name: 'String',
        created_date: 'Date',
        updated_date: 'Date'
    }));
}