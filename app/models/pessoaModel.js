/**
 * Created by bruno on 02/11/17.
 */
var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        nome: {
            type: 'String',
            required: true
        },
        cpf: {
            type: 'String',
            required: true,
            index: {
                unique: true
            }
        },
        sexo: {
            type: 'String',
            required: true
        },
        nascimento: {
            type: 'Date',
            required: true
        }
    });

    return mongoose.model('Pessoa', schema);
};