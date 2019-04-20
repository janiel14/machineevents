const Schema = require('mongoose').Schema;
const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('machines', new Mongoose.Schema({
        active: 'String',
        status: 'String',
        name: 'String',
        created_date: 'Date',
        updated_date: 'Date'
    }));
}