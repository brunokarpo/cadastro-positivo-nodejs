/**
 * Created by bruno on 02/11/17.
 */
var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        cpf: {
            type: 'String',
            required: true
        },
        timestamp: {
            type: 'Date',
            required: true
        }
    });

    return mongoose.model('Alerta', schema);
};