const Schema = require('mongoose').Schema;
const Mongoose = require('mongoose');
module.exports = function(app) {
    return app.mongodb.model('cron', new Mongoose.Schema({
        id: 'Number',
        time: 'Number',
        created_date: 'Date',
        updated_date: 'Date'
    }));
}