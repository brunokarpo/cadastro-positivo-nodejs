var express = require('express');
var load = require('express-load');

module.exports = function () {
    var app = express();
    var rotas = require('../app/routes/rotas');

    app.set('port', 3000);

    load('models', {cwd: 'app'})
        .then('services')
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}